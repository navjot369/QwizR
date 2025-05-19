"use client"
import Image from "next/image"

export default function QuestionDisplay({ question, answer, isCorrect }) {
    const renderMCQ = () => {
        return (
            <div className="space-y-4">
                <p className="font-medium">{question.title}</p>
                <div className="space-y-2">
                    {question.options?.map((option, index) => (
                        <div
                            key={index}
                            className={`p-3 rounded-md border ${
                                answer === index && isCorrect
                                    ? "bg-green-50 border-green-200"
                                    : answer === index
                                        ? "bg-red-50 border-red-200"
                                        : answer === index && !isCorrect
                                            ? "bg-green-50 border-green-200"
                                            : ""
                            }`}
                        >
                            <div className="flex items-center">
                                <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                                <span>{option}</span>
                                {answer === index && isCorrect && (
                                    <span className="ml-auto text-green-600 text-sm font-medium">Your answer (Correct)</span>
                                )}
                                {answer === index && !isCorrect && (
                                    <span className="ml-auto text-red-600 text-sm font-medium">Your answer</span>
                                )}
                                {question.correctOption === index && !isCorrect && (
                                    <span className="ml-auto text-green-600 text-sm font-medium">Correct answer</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const renderFillUp = () => {
        return (
            <div className="space-y-4">
                <p className="font-medium">{question.fillQuestion.replace("[[]]", "_____")}</p>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Your answer:</p>
                        <div
                            className={`p-3 rounded-md border ${
                                isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                            }`}
                        >
                            {answer || <span className="italic text-muted-foreground">No answer provided</span>}
                        </div>
                    </div>

                    {!question.isCorrect && (
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Correct answer:</p>
                            <div className="p-3 rounded-md border bg-green-50 border-green-200">{question.fillAnswers}</div>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    const renderMatching = () => {
        const pairs = Array.isArray(question.matching) ? question.matching: []
        // answer is an array of indices, mapping left side to right side
        // userPairs: [{l, r}] where l from pairs, r from pairs[answer[i]].r
        const userPairs = Array.isArray(answer)
            ? pairs.map((pair, i) => ({
            l: pair.l,
            r: pairs[answer[i]]?.r ?? ""
            }))
            : []

        return (
            <div className="space-y-4">
            {/* <p className="font-medium">{question.title}</p> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Your matches:</p>
                {userPairs.map((pair, index) => (
                    <div
                    key={index}
                    className={`p-3 rounded-md border ${
                        JSON.stringify(pair) === JSON.stringify(pairs[index])
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                    >
                    <div className="flex justify-between">
                        <span>{pair.l}</span>
                        <span>→</span>
                        <span>{pair.r}</span>
                    </div>
                    </div>
                ))}
                </div>

                {!isCorrect && (
                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Correct matches:</p>
                    {pairs.map((pair, index) => (
                    <div key={index} className="p-3 rounded-md border bg-green-50 border-green-200">
                        <div className="flex justify-between">
                        <span>{pair.l}</span>
                        <span>→</span>
                        <span>{pair.r}</span>
                        </div>
                    </div>
                    ))}
                </div>
                )}
            </div>
            </div>
        )
    }

    const renderDrawing = () => {
        return (
            <div className="space-y-4">
                <p className="font-medium">{question.title}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Your drawing:</p>
                        <div className="border rounded-md overflow-hidden bg-white">
                            {answer ? (
                                <div className="relative aspect-video">
                                    <Image
                                        src={answer || "/placeholder.svg"}
                                        alt="User drawing"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            ) : (
                                <div className="p-4 text-center italic text-muted-foreground">No drawing provided</div>
                            )}
                        </div>
                    </div>

                    {/* {!question.isCorrect && (
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Expected drawing:</p>
                            <div className="border rounded-md overflow-hidden bg-white">
                                <div className="relative aspect-video">
                                    <Image
                                        src={answer || "/placeholder.svg"}
                                        alt="Correct drawing"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    )} */}
                </div>
            </div>
        )
    }

    switch (question.type) {
        case "MCQ":
            return renderMCQ()
        case "Fill Ups":
            return renderFillUp()
        case "Matching":
            return renderMatching()
        case "Drawing":
            return renderDrawing()
        default:
            return (
                <div className="p-4 border rounded-md bg-gray-50">
                    <p className="text-muted-foreground">Unknown question type</p>
                </div>
            )
    }
}
