import React from "react"

export default function Question(props){
    const {answer, answers, question, click, id, over} = {...props.data}
    return(
        <div className="question">
            <h2 className="question--text">{question}</h2>
            <div className="question--answers">
                {answers.map((ans, index) =>{
                    return(
                    <button 
                        key={index} 
                        className={`question--answer-button${ans.isSelected?" answer-selected":""}${over?ans.isSelected && !ans.isCorrect?" answer-wrong": ans.isCorrect?" answer-correct":" answer-not-selected":""}`} 
                        id={index} 
                        onClick={(event) => click(event, id)}
                    >
                    {ans.value}
                </button>
                )
                })}
            </div>
            <hr className="question--hr" />
        </div>
    )
}
