import { useState, useEffect } from "react";
import { toast } from "sonner";

const FillUpsEditor = ({question, setQuestion, handleSubmitQuestion}) => {
    const [inputQuestion, setInputQuestion] = useState("");
    const [preview, setPreview] = useState("");
  useEffect(() => {
    setQuestion({
        ...question, 
        fillQuestion: "",
        fillAnswers: []
    })
  }, []);

  const handleTextChange = (input) => {
    const ques = input.replace(/\[\[.*?\]\]/g, '[[]]').trim();
    const answers = [...input.matchAll(/\[\[(.*?)\]\]/g)].map(m => m[1]);

    setQuestion({
        ...question, 
        fillQuestion: ques,
        fillAnswers: answers
    });
    setInputQuestion(input);

    setPreview(input.replace(/\[\[(.*?)\]\]/g, '___________'));
  };

  const handleSubmit = () => {
    if(question.fillQuestion.length == 0) {
      toast.warning("Question statement is empty");
      return;
    }
    if(question.fillAnswers.length == 0) {
      toast.warning("Add atleast one empty blank.");
      return;
    }
    for(let blank of question.fillAnswers) {
      if(blank.trim().length == 0) {
        toast.warning("Empty blanks are not allowed");
        return;
      }
    }

    handleSubmitQuestion();
  }

  const handleHelp = () => {
    alert('To create a blank, surround the correct answer with double square brackets. Example: The capital of France is [[Paris]].');
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Question Text</label>
          <button 
            onClick={handleHelp}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            How to use
          </button>
        </div>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md"
          rows="4"
          placeholder="Enter your text with [[blanks]] in double square brackets"
          value={inputQuestion}
          onChange={(e) => handleTextChange(e.target.value)}
        />
      </div>

      {preview && (
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Preview</label>
          <div className="p-3 bg-white border border-gray-300 rounded-md">
            {preview}
          </div>
        </div>
      )}
            <button
        onClick={handleSubmit}
        className="w-full mt-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Save Question
      </button>
    </div>
  );
};

export default FillUpsEditor;