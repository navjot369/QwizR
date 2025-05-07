"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

const NewAssessmentForm = () => {
    const [token, setToken] = useState("");
  const [assessment, setAssessment] = useState({
    name: "",
    description: "",
    is_active: true,
    start_at: "",
    end_at: "",
    duration: 0,
    sections: [
      {
        section_number: 1,
        name: "",
        duration: 0,
        questions: [],
      },
    ],
  });

  useEffect(() => {
      const LocalToken = localStorage.getItem("auth");
      if(!LocalToken) {
        window.location.href = "/";
      }else{
        setToken(LocalToken);
      }
    }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAssessment((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...assessment.sections];
    updatedSections[index][field] = value;
    setAssessment((prev) => ({ ...prev, sections: updatedSections }));
  };

  const addSection = () => {
    setAssessment((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          section_number: prev.sections.length + 1,
          name: "",
          duration: 0,
          questions: [],
        },
      ],
    }));
  };

  const removeSection = (index) => {
    setAssessment((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5050/tutor/new/assessment", assessment, 
        {
        headers: {
          "Authorization" : token
        }}); 
      toast.success("Assessment created successfully!");
      console.log(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to create assessment");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-4 mt-4 bg-white shadow-md rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Create New Assessment</h2>

      <input
        type="text"
        name="name"
        placeholder="Assessment Name"
        value={assessment.name}
        onChange={handleChange}
        required
        className="w-full p-2 mb-2 border"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={assessment.description}
        onChange={handleChange}
        className="w-full p-2 mb-2 border"
      />

      {/* <label className="block mb-2">
        <input
          type="checkbox"
          name="is_active"
          checked={assessment.is_active}
          onChange={handleChange}
        />{" "}
        Active?
      </label> */}

      <label>
        {" "}
        Start At:
        <input
          type="datetime-local"
          name="start_at"
          value={assessment.start_at}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 border"
        />
      </label>

      <label>
        {" "}
        Ends at:
        <input
          type="datetime-local"
          name="end_at"
          value={assessment.end_at}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 border"
        />
      </label>

      <label>
        {" "}
        Duration:
        <input
          type="number"
          name="duration"
          value={assessment.duration}
          onChange={handleChange}
          placeholder="Total Duration (in minutes)"
          required
          className="w-full p-2 mb-4 border"
        />
      </label>

      <h3 className="text-xl font-semibold">Sections</h3>
      {assessment.sections.map((section, index) => (
        <div key={index} className="mb-4 p-3 border rounded bg-gray-50">
          <input
            type="text"
            placeholder={`Section ${index + 1} Name`}
            value={section.name}
            onChange={(e) => handleSectionChange(index, "name", e.target.value)}
            className="w-full p-2 mb-2 border"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addSection}
        className="px-3 py-1 bg-blue-500 text-white rounded mb-4"
      >
        + Add Section
      </button>
      <button
        type="button"
        onClick={() => removeSection(assessment.sections.length-1)}
        className="px-3 py-1 bg-red-500 text-white rounded mb-4 ml-2"
      >
        + Remove Section
      </button>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Create Assessment
      </button>
    </form>
  );
};

export default NewAssessmentForm;
