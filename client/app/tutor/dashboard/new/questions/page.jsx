"use client"
import React, { useState, useEffect } from 'react';
import MCQEditor from '../components/MCQ';
import FillUpsEditor from '../components/FillUps';
import MatchingEditor from '../components/Matching';
import DrawingEditor from '../components/Drawing';
import { toast } from "sonner";
import axios from 'axios';

const QuestionNew = () => {
  const [token, setToken] = useState("");
  const [selectedType, setSelectedType] = useState('');
  const [question, setQuestion] = useState({
    title: "",
    options: ["", "", "", ""],
    correctOption: null,
    matching: [{l: "", r: ""}, {l: "", r: ""}],
    fillQuestion: "",
    fillAnswers: [],
    marks: 2
  });

  useEffect(() => {
    const LocalToken = localStorage.getItem("auth");
    if(!LocalToken) {
      window.location.href = "/";
    }else{
      setToken(LocalToken);
    }
  }, []);


  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setQuestion({
      title: "",
      options: ["", "", "", ""],
      correctOption: null,
      matching: [{l: "", r: ""}, {l: "", r: ""}],
      fillQuestion: "",
      fillAnswers: [],
      marks: question.marks
    });
  };

  const handleSubmitQuestion = async () => {
    
    const formData = {
        type: selectedType,
        ...question
    }

    try {
        // const res = await axios.post(`${process.env.NODE_PUBLIC_API}/tutor/new/question`,
        const res = await axios.post(`http://localhost:5050/tutor/new/question`,
          {question: formData},
          {
            headers: {
              "Authorization" : token
            }
        });
        console.log(res);

        if(res.status == 200) {
          toast.success("New answer created sucessfully");
          setSelectedType("");
          window.location.reload();
        }
    } catch(err) {
        console.log("Error while saving question");
        console.log(err);
    }
  }

  return (
    <div className="mx-auto p-6 bg-gray-100 rounded-lg shadow-inner">
      <div className="mb-8 flex gap-8 items-center">
        <h3 className="text-lg font-medium text-gray-700">Select Question Type</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <select className="border-2 rounded-xl py-1 px-3 bg-white" onChange={handleTypeChange}>
              <option value="">Select</option>
              <option value="MCQ">MCQ</option>
              <option value="Fill Ups">Fill Ups</option>
              <option value="Drawing">Drawing</option>
              <option value="Matching">Matching</option>
              {/* <option>MCQ</option> */}
            </select>
        </div>
      </div>

      {selectedType? (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="flex w-full justify-end">
            <label className="text-lg font-medium text-gray-700 mr-2">Marks: </label>
            <input className="w-24 text-center bg-white border-1 border-black" type="number" value={question.marks} onChange={(e) => setQuestion({...question, marks: e.target.value})} />
          </div>
          {selectedType === 'MCQ' && <MCQEditor question={question} setQuestion={setQuestion} handleSubmitQuestion={handleSubmitQuestion}/>}
          {selectedType === 'Fill Ups' && <FillUpsEditor question={question} setQuestion={setQuestion} handleSubmitQuestion={handleSubmitQuestion}/>}
          {selectedType === 'Drawing' && <DrawingEditor question={question} setQuestion={setQuestion} handleSubmitQuestion={handleSubmitQuestion}/>}
          {selectedType === 'Matching' && <MatchingEditor question={question} setQuestion={setQuestion} handleSubmitQuestion={handleSubmitQuestion}/>}
              
        </div>
      ) : (<div className="text-4xl mx-auto w-fit text-gray-300 p-24">Select question type to continue</div>
      )}
    
    </div>
  );
};


export default QuestionNew;