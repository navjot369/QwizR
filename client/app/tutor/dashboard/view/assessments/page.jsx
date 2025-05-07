"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const AssessmentsPage = () => {
    const [token, setToken] = useState("");
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        const fetchAssessments = async () => {
            try {
                const response = await axios.get("http://localhost:5050/tutor/view/assessments", 
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                ); 
                setAssessments(response.data);
            } catch (err) {
                console.log(err);
                setError("Failed to fetch assessments");
            } finally {
                setLoading(false);
            }
        };

        fetchAssessments();
    }, [token]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1 className="text-4xl text-blue-600 font-bold p-4">Assessments</h1>
            {assessments.length === 0 ? (
                <p>No assessments available</p>
            ) : (

                    <div className="space-y-6">
  {assessments.map((assessment, index) => (
    <Link
      key={index}
      href={`/tutor/dashboard/view/assessments/${assessment._id}`}
    >
      <div className="w-full border borde-2 shadow-lg p-6 rounded-xl my-4 hover:shadow-2xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{assessment.name}</h2>
      <p className="text-gray-600"><span className="font-medium">Description:</span> {assessment.description}</p>
      <p className="text-gray-600"><span className="font-medium">Active:</span> {assessment.is_active ? "✅ Yes" : "❌ No"}</p>
      <p className="text-gray-600"><span className="font-medium">Start At:</span> {formatDateTime(assessment.start_at)}</p>
      <p className="text-gray-600"><span className="font-medium">End At:</span> {formatDateTime(assessment.end_at)}</p>
      <p className="text-gray-600"><span className="font-medium">Duration:</span> {assessment.duration} minutes</p>

      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Sections</h3>
        <ul className="space-y-3">
          {assessment.sections.map((section, secIndex) => (
            <li key={secIndex} className="p-4 bg-gray-50 rounded-md border border-gray-100">
              <h4 className="text-lg font-medium text-gray-800">
                Section {section.section_number}: {section.name}
              </h4>
              <p className="text-gray-600"><span className="font-medium">Duration:</span> {section.duration} minutes</p>
              <p className="text-gray-600"><span className="font-medium">Questions:</span> {section.questions.length}</p>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </Link>
  ))}
</div>
            )}
        </div>
    );
};

export default AssessmentsPage;

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