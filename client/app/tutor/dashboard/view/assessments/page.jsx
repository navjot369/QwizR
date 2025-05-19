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
       <div className="p-6">
  <h1 className="text-4xl text-blue-700 font-bold mb-8 border-b pb-2">📋 Assessments</h1>

  {assessments.length === 0 ? (
    <p className="text-gray-500 text-lg">No assessments available</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {assessments.map((assessment, index) => (
        <Link
          key={index}
          href={`/tutor/dashboard/view/assessments/${assessment._id}`}
          className="block transition-transform transform hover:scale-[1.02]"
        >
          <div className="bg-white border-2 border-gray-200 shadow-md hover:shadow-xl transition-shadow rounded-2xl p-5 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">{assessment.name}</h2>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">📝 Description:</span> {assessment.description}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">🕒 Duration:</span> {assessment.duration} minutes
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">📅 Start At:</span> {formatDateTime(assessment.start_at)}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">📅 End At:</span> {formatDateTime(assessment.end_at)}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span
                className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  assessment.is_active
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {assessment.is_active ? '✅ Active' : '❌ Inactive'}
              </span>
              <span className="text-sm text-blue-600 font-medium">View ➤</span>
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