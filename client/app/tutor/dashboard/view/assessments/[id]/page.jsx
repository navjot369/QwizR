"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
import QuestionNew from '../../../new/questions/page';
import MCQView from '../../components/MCQ-view';
import FillUpsView from '../../components/FillUps-view';
import DrawingView from '../../components/Drawing-view';
import MatchingView from '../../components/Matching-view';

const AssessmentDetails = () => {
  const [token, setToken] = useState("");
  const [assessment, setAssessment] = useState(null);
  const [questionPool, setQuestionPool] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ text: '', options: [], correctOption: '' });
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  // const [sectionIndex, setSectionIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAddQues, setShowAddQues] = useState(true);

  const params = useParams();
  const assessmentId = params.id;

  useEffect(() => {
          const LocalToken = localStorage.getItem("auth");
          if (!LocalToken) {
            window.location.href = "/";
          } else {
            setToken(LocalToken);
          }
  }, []);

  // console.log(assessment);
  

  useEffect(() => {
    if(token == "") return;

    console.log("Token");
    console.log(token);

    const fetchAssessment = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/tutor/view/assessments?assessmentId=${assessmentId}`, {
          headers: {
            Authorization: token
          }
        });
        console.log(res.data);
        setAssessment(res.data);
      } catch (err) {
        console.error(err);
        toast.error('Error fetching assessment');
      }
    };
    fetchAssessment();
  }, [token]);


  useEffect(() => {
    if(token == "") return;

    const fetchQuestions = async () => {
      try {
        const res = await axios.get('http://localhost:5050/tutor/view/questions', {
          headers: {
            Authorization: token
          }
        });
        setQuestionPool(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestions();
  }, [token]);

  const addToSelected = (qid) => {
    if (!selectedQuestions.includes(qid)) {
      setSelectedQuestions([...selectedQuestions, qid]);
    }
  };

  const removeFromSelected = (qid) => {
    setSelectedQuestions(selectedQuestions.filter(id => id !== qid));
  };

  const handleSaveQuestionsToSection = async (sectionIndex) => {
    if (sectionIndex === null) return alert("Select a section first!");

    const updatedSections = [...assessment.sections];
    updatedSections[sectionIndex].questions = [
      ...updatedSections[sectionIndex].questions,
      ...selectedQuestions.filter(qid => !updatedSections[sectionIndex].questions.includes(qid)),
    ];

    console.log(updatedSections);

    try {
      const res = await axios.put(`http://localhost:5050/tutor/update/assessment`, {
        updatedSections,
        assessmentId
      }, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      });

      setAssessment(res.data.assessment);
      setSelectedQuestions([]);
      toast.success("Questions saved to section!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save questions");
    }
  };



  if (!assessment) return <div>Loading assessment...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Assessment: {assessment.name}</h1>
      <p><strong>Description:</strong> {assessment.description}</p>
      <p><strong>Active:</strong> {assessment.is_active ? 'Yes' : 'No'}</p>
      <p><strong>Start:</strong> {new Date(assessment.start_at).toLocaleString()}</p>
      <p><strong>End:</strong> {new Date(assessment.end_at).toLocaleString()}</p>
      <p><strong>Duration:</strong> {assessment.duration} minutes</p>

      <h2 className="text-2xl mt-6 mb-2">Sections</h2>
      {assessment.sections.map((section, Secindex) => (
        <div key={Secindex} className="p-4 my-2 border rounded bg-gray-50">
          <h3 className="text-xl font-semibold">{section.name}</h3>
          <p>Duration: {section.duration || 'N/A'}</p>
          <p>Questions: {section.questions.length}</p>
          <SectionQuestions sectionId={section._id} assessmentId={assessmentId}/>
      {/* {assessment.sections.map((section, index) => (
        <button
          key={index}
          onClick={() => setSectionIndex(index)}
          className={`m-2 px-4 py-2 border rounded ${
            sectionIndex === index ? 'bg-blue-500 text-white' : ''
          }`}
        >
          {section.name}
        </button>
      ))} */}

      {showAddQues? <button className="mx-auto my-2 block py-1 px-4 rounded text-white bg-green-600" onClick={() => setShowAddQues(false)}>Add more Question from Question Pool</button> : (<div><h2 className="text-xl font-bold mt-6">Question Pool</h2>
      {questionPool.map((ques, ind) => {
        const ViewComponent =
          ques.type === "MCQ" ? MCQView :
          ques.type === "Fill Ups" ? FillUpsView :
          ques.type === "Matching" ? MatchingView :
          ques.type === "Drawing" ? DrawingView : null;

        if (!ViewComponent) return null;

        return (
          <div key={ques._id} className="relative border p-4 mb-3 rounded bg-gray-50">
            <ViewComponent data={ques} num={ind + 1} showAnsGlobal={false} />
            {selectedQuestions.includes(ques._id) ? (
              <button
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => removeFromSelected(ques._id)}
              >
                Remove
              </button>
            ) : (
              <button
                className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded"
                onClick={() => addToSelected(ques._id)}
              >
                +
              </button>
            )}
          </div>
        );
      })}
      </div>)}

      {selectedQuestions.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => handleSaveQuestionsToSection(Secindex)}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Save Selected Questions to Section
          </button>
        </div>
      )}
        </div>
      ))}

      <hr className="my-6" />

      <h2 className="text-2xl mb-2">Create New Question</h2>
      <QuestionNew />
    </div>
  );
};

export default AssessmentDetails;


const SectionQuestions = ({ sectionId, assessmentId }) => {
  console.log(sectionId, assessmentId);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const LocalToken = localStorage.getItem("auth");
    if (!LocalToken) {
      window.location.href = "/";
    } else {
      setToken(LocalToken);
    }
  }, []);

  useEffect(() => {
    if (!token || !sectionId || !assessmentId) return;

    const fetchSectionQuestions = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5050/tutor/view/section/questions?sectionId=${sectionId}&assessmentId=${assessmentId}`, {
          headers: {
            Authorization: token,
          },
        });
        setQuestions(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch questions");
      } finally {
        setLoading(false);
      }
    };

    fetchSectionQuestions();
  }, [token, sectionId, assessmentId]);

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">Section Questions</h2>
      {questions.length === 0 ? (
        <p>No questions found for this section.</p>
      ) : (
        <ul className="list-disc pl-6">
          {questions.map((ques, ind) => {
              if (ques.type == "MCQ") {
                          return (
                            <MCQView
                              data={ques}
                              key={ind}
                              num={ind + 1}
                              showAnsGlobal={false}
                            />
                          );
                        } else if (ques.type == "Fill Ups") {
                          return (
                            <FillUpsView
                              data={ques}
                              key={ind}
                              num={ind + 1}
                              showAnsGlobal={false}
                            />
                          );
                        } else if (ques.type == "Matching") {
                          return (
                            <MatchingView
                              data={ques}
                              key={ind}
                              num={ind + 1}
                              showAnsGlobal={false}
                            />
                          );
                        } else if (ques.type == "Drawing") {
                          return (
                            <DrawingView
                              data={ques}
                              key={ind}
                              num={ind + 1}
                              showAnsGlobal={false}
                            />
                          );
                        }
                      }
          )}
        </ul>
      )}
    </div>
  );
};