"use client"

import { useState } from "react"
import MCQQuestion from "./mcq-question.jsx"
import FillUpsQuestion from "./fill-up-question.jsx"
import MatchingQuestion from "./matching-question.jsx"
import DrawingQuestion from "./drawing-question.jsx"
import axios from "axios"

export default function Question({ question, nextQuestion, token, responseId }) {

    const handleAnswer = (answer, isCorrect) => {
        axios.patch("http://localhost:5050/student/update/response", {
            question,
            answer,
            responseId,
            isCorrect
        }, {
        headers: {
          Authorization: token
        }
        }).then((res) => {
            console.log(res);
        }).catch(err => console.log(err));

    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-4 border-yellow-300">
            <div className="flex justify-between items-center mb-4">
                <div className="bg-blue-700 text-white px-4 py-1 rounded-full text-sm font-bold">{question.type}</div>
                <div className="bg-yellow-400 text-yellow-800 px-4 py-1 rounded-full text-sm font-bold">
                    {question.marks} {question.marks === 1 ? "point" : "points"}
                </div>
            </div>

            {question.type === "MCQ" && <MCQQuestion question={question} onAnswer={handleAnswer} nextQuestion={nextQuestion}/>}

            {question.type === "Fill Ups" && (
                <FillUpsQuestion question={question} onAnswer={handleAnswer}  nextQuestion={nextQuestion}/>
            )}

            {question.type === "Matching" && (
                <MatchingQuestion question={question} onAnswer={handleAnswer} nextQuestion={nextQuestion}/>
            )}

            {question.type === "Drawing" && (
                <DrawingQuestion question={question} onAnswer={handleAnswer} nextQuestion={nextQuestion}/>
            )}
        </div>
    )
}
