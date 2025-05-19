"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

export default function MCQQuestion({ question, onAnswer, nextQuestion }) {
    const [selectedOption, setSelectedOption] = useState(null)
    const [submitted, setSubmitted] = useState(false);

    const handleOptionSelect = (index) => {
        if (submitted) return
        setSelectedOption(index)
    }

    const handleSubmit = () => {
        if(submitted) {
            nextQuestion();
            return;
        }

        if (selectedOption !== null && !submitted) {
            onAnswer(selectedOption, selectedOption === question.correctOption)
            setSubmitted(true);
        }
    }

    // Determine if the answer is correct (for feedback)
    const isCorrect = selectedOption === question.correctOption

    return (
        <div>
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">{question.title}</h2>

            <div className="space-y-4 mb-6">
                {question.options?.map((option, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: submitted ? 1 : 1.02 }}
                        whileTap={{ scale: submitted ? 1 : 0.98 }}
                        onClick={() => handleOptionSelect(index)}
                        className={`
                            p-4 rounded-xl cursor-pointer border-2 transition-all duration-200
                            ${selectedOption === index ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-purple-300"}
                            ${submitted && selectedOption === index ? (isCorrect ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500") : ""}
                        `}
                    >
                        <div className="flex items-center">
                            <div
                                className={`
                                w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white font-bold
                                ${selectedOption === index ? "bg-purple-500" : "bg-gray-300"}
                                ${submitted && selectedOption === index ? (isCorrect ? "bg-green-500" : "bg-red-500") : ""}
                            `}
                            >
                                {String.fromCharCode(65 + index)}
                            </div>
                            <span className="text-lg">{option}</span>

                            {submitted && selectedOption === index && (
                                <div className="ml-auto">
                                    {isCorrect ? <Check className="text-green-500 w-6 h-6" /> : <X className="text-red-500 w-6 h-6" />}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            <button
                onClick={handleSubmit}
                className={`
                    w-full py-3 rounded-xl font-bold text-white transition-all
                    ${selectedOption === null ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"}
                `}
            >
                {submitted ? "Next Question" : "Submit Answer"}
            </button>

            {submitted && (
                <div className={`mt-4 p-4 rounded-lg ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {isCorrect ? (
                        <p className="font-bold">Great job! That's correct! 🎉</p>
                    ) : (
                        <p className="font-bold">Oops! That's not right. Try again next time! 💪</p>
                    )}
                </div>
            )}
        </div>
    )
}
