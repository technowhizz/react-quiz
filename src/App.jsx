import React from "react"
import Welcome from "./components/Welcome"
import Question from "./components/Question"
import he from "he"
import { nanoid } from "nanoid"

export default function App(){

    const [welcome, setWelcome] = React.useState(true)
    const [questions, setQuestions] = React.useState()
    const [questionObjects, setQuestionObjects] = React.useState()
    const [questionElements, setQuestionElements] = React.useState()


    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
            .then(response => response.json())
            .then(responseData => setQuestions(responseData.results))
    }, [])

    React.useEffect(() => {
        if (questions !== undefined){
            const questionsArray = questions.map(obj => {
                const correctAnswer = he.decode(obj.correct_answer)
                const incorrectAnswers = obj.incorrect_answers.map(x => he.decode(x))
                const answers = [correctAnswer, ...incorrectAnswers]
                const id = nanoid()
                const questionObj = {
                    id: id,
                    click: handleClick,
                    question: he.decode(obj.question),
                    answer: correctAnswer,
                    answers: [
                        {
                            value: answers[0],
                            isSelected: false
                        },
                        {
                            value: answers[1],
                            isSelected: false
                        },
                        {
                            value: answers[2],
                            isSelected: false
                        },
                        {
                            value: answers[3],
                            isSelected: false
                        }
                    ]
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

    function startClick(){
        setWelcome(false)
    }

    return(
        <div className={`app${welcome?"":" quizmode"}`}>
            <div className="app--container">
                {welcome && <Welcome click={startClick} />}
                {!welcome && questionElements}

            </div>
        </div>
    )
}

