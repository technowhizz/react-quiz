import React from "react"

export default function Question(props){
    return(
        <div className="question">
            <h2 className="question--text">This is a question?</h2>
            <div className="question--answers">
                <button className="question--answer-button">Hola</button>
                <button className="question--answer-button">Answer 2</button>
                <button className="question--answer-button">Answer 3</button>
                <button className="question--answer-button">Answer 4</button>
            </div>
            <hr className="question--hr" />
        </div>
    )
}
