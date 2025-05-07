import { use, useState, useEffect } from "react";
import { toast } from "sonner";

const MCQEditor = ({ question, setQuestion, handleSubmitQuestion }) => {
  //   const [question, setQuestion] = useState('');
  //   const [options, setOptions] = useState(['', '', '', '']);
  //   const [correctOption, setCorrectOption] = useState(null);
  useEffect(() => {
    setQuestion({
      ...question,
      title: "",
      options: ["", "", "", ""],
      correctOption: null,
    });
  }, []);

  const handleOptionChange = (index, value) => {
    const newOptions = [...question.options];
    newOptions[index] = value;
    setQuestion({ ...question, options: newOptions });
  };

  const addOption = () => {
    const newOptions = [...question.options];
    newOptions.push("");
    setQuestion({ ...question, options: newOptions });
  };

  const removeOption = (index) => {
    if (question.options.length > 2) {
      const newOptions = question.options.filter((_, i) => i !== index);

      let newCorrectOption = question.correctOption;
      if (newCorrectOption == index) newCorrectOption = null;
      else if (newCorrectOption > index) newCorrectOption--;

      setQuestion({
        ...question,
        options: newOptions,
        correctOption: newCorrectOption,
      });
    }
  };

  const handleSubmit = () => {
    if (question.title.length == 0) {
      toast.warning("Question statement is empty");
      return;
    }

    for (let option of question.options) {
      if (option.length == 0) {
        toast.warning("Empty options are not allowed");
        return;
      }
    }
    
    if(question.correctOption == null) {
      toast.warning("Specify the correct option");
      return;
    }

    handleSubmitQuestion();
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Question
        </label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md"
          rows="3"
          placeholder="Enter your question here"
          value={question.title}
          onChange={(e) => setQuestion({ ...question, title: e.target.value })}
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Options
        </label>
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="radio"
              checked={question.correctOption === index}
              onChange={() =>
                setQuestion({ ...question, correctOption: index })
              }
              className="mr-2"
            />
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-md"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
            <button
              onClick={() => removeOption(index)}
              className="ml-2 p-1 text-red-500 hover:text-red-700 font-extrabold"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          onClick={addOption}
          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
        >
          + Add Option
        </button>
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

export default MCQEditor;
