import { useState } from "react";
import { toast } from "sonner";


const DrawingEditor = ({question, setQuestion, handleSubmitQuestion}) => {
  const handleChange = (e) => {
    setQuestion({
      ...question, title: e.target.value
    })
  };

  const handleSubmit = () => {
    if(question.title.trim().length == 0) {
      toast.warning("Specify what to draw.");
      return;
    }

    handleSubmitQuestion();
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">Drawing Prompt</label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md"
          rows="3"
          placeholder="Enter instructions for the drawing task"
          value={question.title}
          onChange={handleChange}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full mt-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Save Question
      </button>
    </div>
  );
};

export default DrawingEditor;