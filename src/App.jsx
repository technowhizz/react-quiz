import React from "react"
import Welcome from "./components/Welcome"
import Question from "./components/Question"
import he from "he"
import { nanoid } from "nanoid"
import ReactConfetti from "react-confetti"
import ReactLoading from "react-loading"

export default function App(){

    const [welcome, setWelcome] = React.useState(true)
    const [questions, setQuestions] = React.useState()
    const [questionObjects, setQuestionObjects] = React.useState()
    const [questionElements, setQuestionElements] = React.useState()
    const [score, setScore] = React.useState(0)
    const [over, setOver] = React.useState(false)
    const [resetVal, setResetVal] = React.useState(false)
    const [token, setToken] = React.useState()
    const [tokenReset, setTokenReset] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (questions){
            if (questions.response_code == 4){
                resetToken()
            }
        }

    }, [questions])

    React.useEffect(() => { 
        const now = new Date()
        const localToken = JSON.parse(localStorage.getItem("quizToken")) || false
        if (localToken && (now.getTime() < parseInt(localToken.expiry) - 300000)){
            setToken(localToken.token)
        }else{
            fetch("https://opentdb.com/api_token.php?command=request")
                .then(response => response.json())
                .then(data => {
                    const remoteToken = data.token
                    const tokenObject = {
                        token: data.token,
                        expiry: now.getTime() + 21600000
                    }
                    localStorage.setItem("quizToken", JSON.stringify(tokenObject))
                    setToken(remoteToken)
                })
        }
    }, [])

    React.useEffect(() => {
        if (token){
            fetch(`https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple&token=${token}`)
                .then(response => response.json())
                .then(responseData => {
                    setLoading(false)
                    setQuestions(responseData)})
        }
    }, [resetVal, token, tokenReset])

    React.useEffect(() => {
        if (questions !== undefined){
            const questionsArray = questions.results.map(obj => {
                const correctAnswer = he.decode(obj.correct_answer)
                const incorrectAnswers = obj.incorrect_answers.map(x => he.decode(x))
                let answers = [correctAnswer, ...incorrectAnswers]
                answers = shuffle(answers)
                const id = nanoid()
                const questionObj = {
                    id: id,
                    click: handleClick,
                    question: he.decode(obj.question),
                    answer: correctAnswer,
                    answers: answers.map((item)=>{
                        return({
                            value: item,
                            isSelected: false,
                            isCorrect: false
                        })
                    })
                }
                return(questionObj)
                
            })
            setQuestionObjects(questionsArray)
        } 
    }, [questions])
    
    React.useEffect(() => {
        if (questionObjects !== undefined){
            const abc = questionObjects.map(obj => (
                    <Question 
                        key={obj.id} 
                        data={obj}
                    />                 
                ))
            setQuestionElements(abc)
        }
    },[questionObjects])

    function handleClick(event, id){
        setQuestionObjects((questionObjects) => {
            const newQuestionObjs = questionObjects.map(obj => {
                if(obj.id === id){
                    const newAnswers = obj.answers.map((answer, index) => {
                        if (index == event.target.id){
                            return({
                                ...answer,
                                isSelected: !answer.isSelected
                            })
                        }else{
                            return({
                                ...answer,
                                isSelected: false
                            })
                        }
                    })
                    return({
                        ...obj,
                        answers: newAnswers
                    })
                }else{
                    return({...obj})
                }
            })
            return newQuestionObjs
        })
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return (array)
      }

    function startClick(){
        setWelcome(false)
    }

    function checkAnswers(){
        setQuestionObjects(oldObjs => {
            setOver(true)
            let count = 0
            const newObjs = oldObjs.map((obj)=> {
                const newAnswers = obj.answers.map(ans=>{
                    if(ans.value === obj.answer){
                        if (ans.isSelected){
                            count ++
                        }
                        return({
                            ...ans,
                            isCorrect: true
                        })
                    }else{
                        return({...ans})
                    }
                })
                return({
                    ...obj,
                    answers: newAnswers,
                    over: true
                })

           })
           setScore(count)
           return(newObjs)
        })
    }

    function resetToken(){
        fetch(`https://opentdb.com/api_token.php?command=reset&token=${token}`)
        setTokenReset(old => !old)
    }

    function reset(){
        setOver(false)
        setScore(0)
        setResetVal(old => !old)
        setLoading(true)
    }

    var body = document.body,html = document.documentElement;
    var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

    return(
        <div className={`app${welcome?"":" quizmode"}`}>
            <div className="app--container">
                {loading && <ReactLoading className="app--loading" type="spin" color="#677bec" /> }
                {welcome && <Welcome click={startClick} />}
                {!welcome && !loading && questionElements}
                {!welcome && !over && !loading && <button className="app--submit" onClick={checkAnswers}>Check Answers</button>}
                {!welcome && over && <div className="app--score-button-container">
                    {score >5 ? <ReactConfetti height={height}/>:null}
                    <h3 className="app--score-text">{`You scored ${score}/5 correct answers`}</h3>
                    <button className="app--start-again" onClick={reset}>Play Again</button>
                    </div>}
            </div>
        </div>
    )
}

