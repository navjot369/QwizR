"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AssessmentPage = () => {
    const [assessments, setAssessments] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                const response = await axios.get('http://localhost:5050/student/all/assessment');
                const data = await response.json();
                setAssessments(data);
            } catch (error) {
                console.error('Error fetching assessments:', error);
            }
        };

        fetchAssessments();
    }, []);

    const handleCompleteAssessment = (id) => {
        router.push(`/assessment/${id}`);
    };

    return (
        <div>
            <h1>Assessments</h1>
            {assessments.length > 0 ? (
                <ul>
                    {assessments.map((assessment) => (
                        <li key={assessment._id}>
                            <span>{assessment.name}</span>
                            <button onClick={() => handleCompleteAssessment(assessment._id)}>
                                Complete Assessment Now
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No assessments available.</p>
            )}
        </div>
    );
};

export default AssessmentPage;