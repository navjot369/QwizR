"use client"
import { useParams } from "next/navigation"
import {useState, useEffect} from "react"
import axios from "axios";
import Link from "next/link";
import Question from "./components/question.jsx"

export default function AssessmentPage() {
    const [token, setToken] = useState("");
    const params = useParams();
    const assessment_id = params.assessment_id;

    useEffect(() => {
        const LocalToken = localStorage.getItem("auth");
        if (!LocalToken) {
            window.location.href = "/";
        } else {
            setToken(LocalToken);
        }
    }, []);

    const [assessmentData, setAssessmentData] = useState(null);
    const [allResponseData, setAllResponseData] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [questionsData, setQuestionsData] = useState(null);
    const [questionNum, setQuestionNum] = useState(null);
    const [isContinue, setIsContinue] = useState(false);
    const [grade, setGrade] = useState([0, 0]);

    console.log(questionsData);

    useEffect(() => {
      if(allResponseData == null || allResponseData.length == 0) return;
      const lastResponse = allResponseData[allResponseData.length - 1];
      if(lastResponse == null) return;
      if (!lastResponse.isCompleted) return;
      
      let bestCorrect = 0;
      let bestTotal = lastResponse.totalQuestion;

      if (Array.isArray(allResponseData) && allResponseData.length > 0) {
      allResponseData.forEach(res => {
        if(res.correctQuestion > bestCorrect) {
        bestCorrect = res.correctQuestion;
        }
      });
      setGrade([bestCorrect, bestTotal]);
      }
    }, [allResponseData]);


    useEffect(() => {
        if (!token) return;

        axios.get(`http://localhost:5050/student/assessment?assessment_id=${assessment_id}`, {
            headers: { Authorization: token }
        })
        .then(res => {
            console.log(res);
            setAssessmentData(res.data.assessment);
            setAllResponseData(res.data.responses);

            for(let response in res.data.responses) {
                if(!response.isCompleted) {
                    setIsContinue(false);
                    break;
                }
            }
        })
        .catch(err => console.error(err));
    }, [token]);

    const handleStart = () => {
      axios.post("http://localhost:5050/student/assessment/start", {
        assessment_id
      },{
        headers: {
          Authorization: token
        }
      }).then(res => {
        setResponseData(res.data.response);
        setQuestionsData(res.data.questionsArr);
        setQuestionNum(0);
      }).catch(err => console.log(err));
    }

    const handleFinalSubmit = () => {
            axios.post("http://localhost:5050/student/assessment/submit", {
          response_id: responseData._id,
          assessment_id
            }, {
          headers: { Authorization: token }
            })
            .then(res => {
          // Optionally redirect or show a message
          window.location.href="/student/dashboard"
            })
            .catch(err => console.error(err));
          }

    const nextQuestion = () => {
      if (questionsData && questionNum < questionsData.length) {
        setQuestionNum(questionNum + 1);
      }
    };

    const prevQuestion = () => {
      if (questionsData && questionNum > 0) {
        setQuestionNum(questionNum - 1);
      }
    };


    if(assessmentData == null && responseData == null) {
        return(<div>Loading...</div>);
    }

    if(questionsData != null && questionNum == questionsData.length) {
      return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-100">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          {assessmentData.name}
        </h2>
        <p className="text-gray-700 mb-6">
          You have answered all <span className="font-semibold">{questionsData.length}</span> questions.
        </p>
        <button
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition"
          onClick={handleFinalSubmit}
        >
          Submit Assessment
        </button>
          </div>
        </main>
      );
    }

    if(questionNum != null) {
      return(<main className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-blue-100 to-blue-100">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-600">{assessmentData.name}</h1>
        <Question
          question={questionsData[questionNum]}
          nextQuestion={nextQuestion}
          prevQuestion={prevQuestion}
          token={token}
          responseId={responseData._id}
        />
      </div>
    </main>)}


    
    return (
      <div className="p-6 space-y-6 bg-white flex h-screen w-screen justify-center items-stretch md:p-28 flex-col ">
        <div className="fixed top-0 right-0 text-blue-600 p-11">
          <Link href="/student/dashboard">Close</Link>
        </div>
        {/* Assessment Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">{assessmentData.name}</h1>
          <p className="text-gray-600 mt-2">{assessmentData.description}</p>
        </div>

        {/* Grade Section */}
        {(allResponseData.length > 0) && (
          <div className="bg-green-100 p-4 rounded-2xl text-center shadow-sm flex items-center gap-5 justify-center">
            <h3 className="text-xl font-semibold text-green-800">Your Grade</h3>
            {/* You can insert grade details here */}
            <p className="text-2xl font-bold text-green-700">
              {grade[0]} / {grade[1]} <span className="text-base text-gray-600 font-normal">(Best of All)</span>
            </p>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-blue-100 p-6 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-center shadow-sm">
          <div>
            <p className="text-gray-500">Duration</p>
            <p className="text-lg font-medium text-gray-800">{assessmentData.duration} min</p>
          </div>
          <div>
            <p className="text-gray-500">Attempts</p>
            <p className="text-lg font-medium text-gray-800">{allResponseData.length}</p>
          </div>
          <div>
            {isContinue ? (
              <button className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full shadow-md transition">
                Resume
              </button>
            ) : (
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md transition" onClick={handleStart}>
                Start
              </button>
            )}
          </div>
        </div>

        {/* Previous Responses */}
        <div className="bg-gray-100 p-6 rounded-2xl shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Previous Responses</h3>
          {allResponseData.length > 0 ? (
            <ul className="space-y-2">
              {allResponseData.map((res, index) => (
                <li key={index} className="p-3 bg-white rounded-lg shadow text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between">
                  <span>
                    <span className="font-semibold">Attempt {index + 1}</span>
                    {" | "}
                    <span>
                      {res.created_time
                        ? new Date(res.created_time).toLocaleString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A"}
                    </span>
                  </span>
                  <span>
                    Total Questions: <span className="font-semibold">{res.totalQuestion ?? "N/A"}</span>
                    {" | "}
                    Correct: <span className="font-semibold">{res.correctQuestion ?? "N/A"}</span>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">You haven't completed this assessment yet.</p>
          )}
        </div>
      </div>
    )
}