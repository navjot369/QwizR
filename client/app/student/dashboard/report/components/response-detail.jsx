"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import QuestionDisplay from "./question-display"

export default function ResponseDetail({ responseId }) {
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [token, setToken] = useState("");
    const router = useRouter()

    useEffect(() => {
        const LocalToken = localStorage.getItem("auth");
        if (!LocalToken) {
            window.location.href = "/";
        } else {
            setToken(LocalToken);
        }
    }, []);

    useEffect(() => {
        if(token == "") return;
        const fetchResponseDetail = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(`http://localhost:5050/student/response?response_id=${responseId}`, {
                    headers: {
                        Authorization: token
                    }
                })
                console.log(data);
                setResponse(data.response)
                setError(null)
            } catch (err) {
                console.error("Failed to fetch response details:", err)
                setError("Failed to load response details. Please try again later.")
            } finally {
                setLoading(false)
            }
        }

        fetchResponseDetail()
    }, [responseId, token])

    const handleBack = () => {
        router.back()
    }

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center mb-6">
                    <Skeleton className="h-10 w-24 mr-4" />
                    <Skeleton className="h-8 w-1/2" />
                </div>
                <Skeleton className="h-24 w-full mb-6" />
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-64 w-full mb-6" />
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-6 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-600">{error}</p>
                <Button variant="outline" className="mt-4" onClick={handleBack}>
                    Go Back
                </Button>
            </div>
        )
    }

    if (!response) {
        return <p className="text-center py-8 text-muted-foreground">Response not found.</p>
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center mb-6">
                <Button variant="outline" onClick={handleBack} className="mr-4">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>
                <h1 className="text-2xl font-bold">{response.assessment.title}</h1>
            </div>

            <Card className="mb-6">
                <CardHeader className="pb-2">
                    <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col">
                            <span className="text-muted-foreground text-sm">Total Questions</span>
                            <span className="text-2xl font-bold">{response.totalQuestion}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-muted-foreground text-sm">Correct Answers</span>
                            <span className="text-2xl font-bold text-green-600">{response.correctQuestion}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-muted-foreground text-sm">Score</span>
                            <span
                                className={`text-2xl font-bold ${
                                    (response.correctQuestion / response.totalQuestion) * 100 >= 70 ? "text-green-600" : "text-red-600"
                                }`}
                            >
                                {Math.round((response.correctQuestion / response.totalQuestion) * 100)}%
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                {response.responses.map((res, index) => (
                    <Card
                        key={res._id}
                        className={`border-l-4 ${res.isCorrect ? "border-l-green-500" : "border-l-red-500"}`}
                    >
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                            {res.isCorrect ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                                <XCircle className="h-5 w-5 text-red-500" />
                            )}
                        </CardHeader>
                        <CardContent>
                            <QuestionDisplay question={res.question} answer={res.answer} isCorrect={res.isCorrect}/>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
