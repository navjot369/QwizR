"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useRouter } from 'next/navigation';

const AssessmentPage = () => {
    const [token, setToken] = useState("");
    const [assessments, setAssessments] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const localToken = localStorage.getItem("auth");
        if(localToken) {
            setToken(localToken);
        }else{
            window.location.href = "/";
        }
    }, []);

    console.log(assessments);

    useEffect(() => {
        if(token == "") return;

        const fetchAssessments = async () => {
            try {
                const response = await axios.get('http://localhost:5050/student/all/assessment', {
                    headers: {
                        Authorization: token
                    }
                });
                const data = response.data;
                setAssessments(data.assessments);
            } catch (error) {
                console.error('Error fetching assessments:', error);
            }
        };

        fetchAssessments();
    }, [token]);

    const handleCompleteAssessment = (id) => {
        router.push(`/student/assessment/${id}`);
    };

    return (
        <div>
            <h1 className="text-blue-600 text-4xl font-bold p-4">Assessments</h1>
            {assessments.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {assessments.map((assessment, ind) => (
                        <Card key={ind}>
                            <CardHeader>
                                <CardTitle className="text-2xl">{assessment.name}</CardTitle>
                                <CardDescription>{assessment.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p><span className="font-bold">Start:</span> {formatDateTime(assessment.start_at)}</p>
                                <p><span className="font-bold">End: </span>{formatDateTime(assessment.end_at)}</p>

                            <button onClick={() => handleCompleteAssessment(assessment._id)} className="bg-green-700 mx-auto block py-1 px-2 mt-3 rounded text-white">
                                Take this assessment
                            </button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <p>No assessments available.</p>
            )}
        </div>
    );
};

export default AssessmentPage;


function formatDateTime(datetimeStr) {
    const date = new Date(datetimeStr);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short', // "May"
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }