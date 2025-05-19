"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, X, ArrowRight } from "lucide-react"

export default function MatchingQuestion({ question, onAnswer, nextQuestion}) {
    const [submitted, setSubmitted] = useState(false);
    const matchingItems = question.matching;

    const [rightItems, setRightItems] = useState([])
    const [selectedLeft, setSelectedLeft] = useState(null)
    const [selectedRight, setSelectedRight] = useState(null)
    const [matches, setMatches] = useState(Array(matchingItems.length).fill(-1))

    useEffect(() => {
        // Shuffle the right column items
        const shuffled = [...matchingItems.map((item) => item.r)].sort(() => Math.random() - 0.5)
        setRightItems(shuffled)
        // eslint-disable-next-line
    }, [])

    const handleLeftSelect = (index) => {
        if (submitted || matches[index] !== -1) return
        setSelectedLeft(index)

        // If right is already selected, make a match
        if (selectedRight !== null) {
            const newMatches = [...matches]
            newMatches[index] = selectedRight
            setMatches(newMatches)
            setSelectedLeft(null)
            setSelectedRight(null)
        }
    }

    const handleRightSelect = (index) => {
        if (submitted) return

        // Check if this right item is already matched
        if (matches.includes(index)) return

        setSelectedRight(index)

        // If left is already selected, make a match
        if (selectedLeft !== null) {
            const newMatches = [...matches]
            newMatches[selectedLeft] = index
            setMatches(newMatches)
            setSelectedLeft(null)
            setSelectedRight(null)
        }
    }

    const handleSubmit = () => {
        if(submitted) {
            nextQuestion();
            return;
        }

        if (!matches.includes(-1)) {
            const matchResults = checkMatches();
            const allCorrect = matchResults.every((result) => result);
            onAnswer(matches, allCorrect);
            setSubmitted(true);
        }
    }

    // Check if matches are correct
    const checkMatches = () => {
        return matches.map((rightIndex, leftIndex) => {
            const correctRight = matchingItems[leftIndex].r
            return rightItems[rightIndex] === correctRight
        })
    }

    const matchResults = submitted ? checkMatches() : []
    const allCorrect = submitted && matchResults.every((result) => result)

    return (
        <div>
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">{question.title || "Match the items"}</h2>

            <div className="grid grid-cols-3 gap-4 mb-6">
                {/* Left column */}
                <div className="space-y-3">
                    {matchingItems.map((item, index) => (
                        <motion.div
                            key={`left-${index}`}
                            whileHover={{ scale: submitted || matches[index] !== -1 ? 1 : 1.02 }}
                            whileTap={{ scale: submitted || matches[index] !== -1 ? 1 : 0.98 }}
                            onClick={() => handleLeftSelect(index)}
                            className={`
                                p-3 rounded-lg cursor-pointer border-2 transition-all
                                ${selectedLeft === index ? "border-purple-500 bg-purple-50" : "border-gray-200"}
                                ${matches[index] !== -1 ? "bg-blue-50 border-blue-300" : ""}
                                ${submitted && matchResults[index] ? "bg-green-100 border-green-500" : ""}
                                ${submitted && !matchResults[index] ? "bg-red-100 border-red-500" : ""}
                            `}
                        >
                            {item.l}
                            {submitted && (
                                <span className="ml-2">
                                    {matchResults[index] ? (
                                        <Check className="inline text-green-500 w-4 h-4" />
                                    ) : (
                                        <X className="inline text-red-500 w-4 h-4" />
                                    )}
                                </span>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Middle column with arrows */}
                <div className="flex flex-col items-center justify-center space-y-3">
                    {matchingItems.map((_, index) => (
                        <div key={`arrow-${index}`} className="flex justify-center">
                            {matches[index] !== -1 && (
                                <ArrowRight
                                    className={`
                                    w-6 h-6 transition-all
                                    ${submitted && matchResults[index] ? "text-green-500" : ""}
                                    ${submitted && !matchResults[index] ? "text-red-500" : "text-blue-500"}
                                `}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Right column */}
                <div className="space-y-3">
                    {rightItems.map((item, index) => (
                        <motion.div
                            key={`right-${index}`}
                            whileHover={{ scale: submitted || matches.includes(index) ? 1 : 1.02 }}
                            whileTap={{ scale: submitted || matches.includes(index) ? 1 : 0.98 }}
                            onClick={() => handleRightSelect(index)}
                            className={`
                                p-3 rounded-lg cursor-pointer border-2 transition-all
                                ${selectedRight === index ? "border-purple-500 bg-purple-50" : "border-gray-200"}
                                ${matches.includes(index) ? "bg-blue-50 border-blue-300" : ""}
                                ${
                                    submitted &&
                                    matches.findIndex((m) => m === index) !== -1 &&
                                    matchResults[matches.findIndex((m) => m === index)]
                                        ? "bg-green-100 border-green-500"
                                        : ""
                                }
                                ${
                                    submitted &&
                                    matches.findIndex((m) => m === index) !== -1 &&
                                    !matchResults[matches.findIndex((m) => m === index)]
                                        ? "bg-red-100 border-red-500"
                                        : ""
                                }
                            `}
                        >
                            {item}
                        </motion.div>
                    ))}
                </div>
            </div>

            <button
                onClick={handleSubmit}
                disabled={matches.includes(-1)}
                className={`
                    w-full py-3 rounded-xl font-bold text-white transition-all
                    ${matches.includes(-1) ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}
                `}
            >
                {submitted ? "Next Question" : "Submit Matches"}
            </button>

            {submitted && (
                <div
                    className={`mt-4 p-4 rounded-lg ${allCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                    {allCorrect ? (
                        <p className="font-bold">Amazing! All your matches are correct! 🎉</p>
                    ) : (
                        <div>
                            <p className="font-bold mb-2">Some matches need correction:</p>
                            <ul className="list-disc pl-5">
                                {matchResults.map(
                                    (result, index) =>
                                        !result && (
                                            <li key={index}>
                                                <span className="font-bold">{matchingItems[index].l}</span> should match with{" "}
                                                <span className="font-bold">{matchingItems[index].r}</span>
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
