import { useState, useEffect } from "react";
import { toast } from "sonner";

const MatchingEditor = ({question, setQuestion, handleSubmitQuestion}) => {
    const [pairs, setPairs] = useState([]);

  
    const handlePairChange = (index, side, value) => {
      const newPairs = [...question.matching];
      newPairs[index][side] = value;
      setQuestion({
        ...question,
        matching: newPairs
      });
    };
  
    const addPair = () => {
      const newMatching = [...question.matching, {l: '', r: ''}];
      setQuestion({...question, matching: newMatching});
    };
  
    const removePair = (index) => {
      if (question.matching.length > 2) {
        const newPairs = question.matching.filter((_, i) => i !== index);
        setQuestion({...question, matching: newPairs});
      }
    };

    const handleSubmit = () => {
      if(question.matching.length < 2) {
        toast.warning("Specify atleast two matching options");
      }

      for(let options of question.matching) {
        if(options.l.trim() == "" || options.r.trim() == "") {
          toast.warning("Empty options are not allowed");
          return;
        }
      }

      handleSubmitQuestion();
    }
  
    return (
      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Matching Pairs</label>
          
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="font-medium text-gray-600 text-center">Item</div>
            <div className="font-medium text-gray-600 text-center">Match</div>
          </div>
          
          {question.matching.map((pair, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 items-center mb-2">
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Item"
                  value={pair.l}
                  onChange={(e) => handlePairChange(index, 'l', e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                  placeholder="Match"
                  value={pair.r}
                  onChange={(e) => handlePairChange(index, 'r', e.target.value)}
                />
                <button
                  onClick={() => removePair(index)}
                  className="ml-2 p-1 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
  
          <button
            onClick={addPair}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
          >
            + Add Pair
          </button>
        </div>
        <button
        onClick={handleSubmit}
        className="w-full mt-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" >
        Save Question
      </button>
      </div>
    );
  };

export default MatchingEditor;