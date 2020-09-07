import React, { useState } from 'react'

export default function Flashcard({ flashcard }) {
    const [ flip, setFlip ] = useState(false);

    return (
        <div 
            className={`card ${flip ? 'flip' : ''}`}
            onClick={() => setFlip(!flip)}
        >
            <div className="front">
                <span className="flashcard-question">
                    {flashcard.question}
                </span>
                <div className="flashcard-options">
                    {flashcard.options.map(option => {
                        return (
                            <div className="flashcard-option" key={option}>
                                {option}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="back">
                {flashcard.answer}
            </div>
        </div>
    )
}
