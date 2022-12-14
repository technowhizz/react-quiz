import React from "react"

export default function Welcome(props){
    return(
        <div className="welcome">
            <h1 className="welcome--title">My Quiz</h1>
            <p className="welcome--desc">Test your general knowledge with this quick fun Quiz</p>
            <button className="welcome--button" onClick={props.click}>
                <p>Start Quiz</p>
            </button>
        </div>
    )
}
