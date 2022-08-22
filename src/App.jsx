import React from "react"
import Welcome from "./components/Welcome"
import Question from "./components/Question"

export default function App(){

    const [welcome, setWelcome] = React.useState(true)
    const [questions, setQuestions] = React.useState()

    React.useEffect(() => {
        fetch
    })

    function startClick(){
        setWelcome(false)
    }

    return(
        <div className={`app${welcome?"":" quizmode"}`}>
            <div className="app--container">
                {welcome && <Welcome click={startClick} />}
                {!welcome && <Question />}
                {!welcome && <Question />}
                {!welcome && <Question />}
                {!welcome && <Question />}
                {!welcome && <Question />}
            </div>
        </div>
    )
}

