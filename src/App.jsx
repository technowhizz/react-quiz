import React from "react"
import Welcome from "./components/Welcome"

export default function App(){

    const [welcome, setWelcome] = React.useState(true)

    function startClick(){
        setWelcome(false)
    }

    return(
        <div className={`app${welcome?"":" quizmode"}`}>
            <div className="app--container">
                {welcome && <Welcome click={startClick} />}
            </div>
        </div>
    )
}

