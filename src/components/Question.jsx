import React from "react"

export default function Question(props){
    const {answer, answers, question, click, id} = {...props.data}
    return(
        <div className="question">
            <h2 className="question--text">{question}</h2>
            <div className="question--answers">
                <button className={`question--answer-button${answers[0].isSelected?" answer-selected":""}`} id={0} onClick={(event) => click(event, id)}>
                    {answers[0].value}
                </button>
                <button className={`question--answer-button${answers[1].isSelected?" answer-selected":""}`} id={1} onClick={(event) => click(event, id)}>
                    {answers[1].value}
                </button>
                <button className={`question--answer-button${answers[2].isSelected?" answer-selected":""}`} id={2} onClick={(event) => click(event, id)}>
                    {answers[2].value}
                </button>
                <button className={`question--answer-button${answers[3].isSelected?" answer-selected":""}`} id={3} onClick={(event) => click(event, id)}>
                    {answers[3].value}
                </button>
            </div>
            <hr className="question--hr" />
        </div>
    )
}
