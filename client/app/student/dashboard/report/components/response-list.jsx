"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { Skeleton } from "@/components/ui/skeleton"

export default function ResponseList() {
    const [responses, setResponses] = useState([])
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
        const fetchResponses = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get("http://localhost:5050/student/responses/list", {
                    headers: {
                        Authorization: token
                    }
                })
                console.log(data);
                setResponses(data.responses)
                setError(null)
            } catch (err) {
                console.error("Failed to fetch responses:", err)
                setError("Failed to load responses. Please try again later.")
            } finally {
                setLoading(false)
            }
        }

        fetchResponses()
    }, [token])

    const handleResponseClick = (id) => {
        router.push(`/student/dashboard/report/${id}`)
    }

    if (loading) {
        return (
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <Skeleton className="h-6 w-3/4 mb-4" />
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-4 w-1/4" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-6 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-600">{error}</p>
                <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                    Try Again
                </Button>
            </div>
        )
    }

    if (responses.length === 0) {
        return <p className="text-center py-8 text-muted-foreground">No responses found.</p>
    }

    return (
        <div className="space-y-4">
            {responses.map((response) => (
                <Card
                    key={response._id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleResponseClick(response._id)}
                >
                    <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-1">{response.assessment.name}</h2>
                        <p className="text-sm mb-3">{response.assessment.description}</p>
                        <div className="flex justify-between text-sm">
                            <div className="space-x-4">
                                <span className="inline-flex items-center">
                                    <span className="font-medium mr-2">Score:</span>
                                    <span className="text-green-600 font-medium">
                                        {response.correctQuestion} / {response.totalQuestion}
                                    </span>
                                </span>
                                <span className="inline-flex items-center">
                                    <span className="font-medium mr-2">Percentage:</span>
                                    <span
                                        className={`font-medium ${
                                            (response.correctQuestion / response.totalQuestion) * 100 >= 70
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {Math.round((response.correctQuestion / response.totalQuestion) * 100)}%
                                    </span>
                                </span>
                            </div>
                            <span className="text-muted-foreground">
                                {formatDistanceToNow(new Date(response.created_time), { addSuffix: true })}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
