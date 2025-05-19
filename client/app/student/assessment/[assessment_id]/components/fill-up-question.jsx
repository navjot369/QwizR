"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"



export default function FillUpsQuestion({ question, onAnswer, nextQuestion }) {
    const [answers, setAnswers] = useState(Array(question.fillAnswers?.length || 0).fill(""));
    const [submitted, setSubmitted] = useState(false);


    const handleAnswerChange = (index, value) => {
        if (submitted) return
        const newAnswers = [...answers]
        newAnswers[index] = value
        setAnswers(newAnswers)
    }

    const handleSubmit = () => {
         if(submitted) {
            nextQuestion();
            return;
        }

        if (!submitted && !answers.includes("")) {
            const answerResults =  checkAnswers()
            const allCorrect = answerResults.every((result) => result)
            onAnswer(answers, allCorrect)
            setSubmitted(true);
        }
    }

    // Check if answers are correct
    const checkAnswers = () => {
        return answers.map((answer, index) => {
            const correctAnswer = question.fillAnswers?.[index] || sampleFillAnswers[index]
            return answer.toLowerCase() === correctAnswer.toLowerCase()
        })
    }

    const answerResults = submitted ? checkAnswers() : []
    const allCorrect = submitted && answerResults.every((result) => result)

    const questionParts = (question.fillQuestion).split("[[]]")

    return (
        <div>
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">{question.title || "Fill in the blanks"}</h2>

            <div className="mb-6 text-lg">
                {questionParts.map((part, index) => (
                    <span key={index}>
                        {part}
                        {index < questionParts.length - 1 && (
                            <span className="inline-block mx-1">
                                <input
                                    type="text"
                                    value={answers[index] || ""}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    disabled={submitted}
                                    className={`
                                        w-28 px-2 py-1 border-b-2 focus:outline-none text-center
                                        ${submitted ? (answerResults[index] ? "border-green-500 text-green-700" : "border-red-500 text-red-700") : "border-purple-500"}
                                    `}
                                />
                                {submitted && (
                                    <span className="ml-1">
                                        {answerResults[index] ? (
                                            <Check className="inline text-green-500 w-5 h-5" />
                                        ) : (
                                            <X className="inline text-red-500 w-5 h-5" />
                                        )}
                                    </span>
                                )}
                            </span>
                        )}
                    </span>
                ))}
            </div>

            <button
                onClick={handleSubmit}
                className={`
                    w-full py-3 rounded-xl font-bold text-white transition-all
                    ${answers.includes("") ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}
                `}
            >
                {submitted ? "Next Question" : "Submit Answer"}
            </button>

            {submitted && (
                <div
                    className={`mt-4 p-4 rounded-lg ${allCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                    {allCorrect ? (
                        <p className="font-bold">Fantastic! All your answers are correct! 🎉</p>
                    ) : (
                        <div>
                            <p className="font-bold mb-2">Some answers need correction:</p>
                            <ul className="list-disc pl-5">
                                {answerResults.map(
                                    (result, index) =>
                                        !result && (
                                            <li key={index}>
                                                The correct answer for blank #{index + 1} is:{" "}
                                                <span className="font-bold">{question.fillAnswers?.[index] || sampleFillAnswers[index]}</span>
                                            </li>
                                        ),
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
