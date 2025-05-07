"use client"
import { useState, useEffect } from "react";
import clsx from "clsx";

export default function FillUpsView({ data, num, showAnsGlobal }) {
    const [ showAns, setShowAns ] = useState(false);
    const [quesArr, setQuesArr] = useState([]);
    useEffect(() => {
        if(showAnsGlobal) setShowAns(true);
        setQuesArr(data.fillQuestion.split("[[]]"));
    }, [])



    return(<div className="my-8 grid grid-cols-[30px_1fr] w-full group">
        <div className="flex p-2 justify-center text-xl">{num}.</div>
        <div>
        <div className="flex gap-2">
        <h5 className="text-xs text-gray-600 border-2 border-gray-600 rounded-2xl w-fit bg-gray-200 font-bold px-2">Fill Ups</h5>
        {!showAnsGlobal && <button className="hidden text-xs rounded-full font-bold group-hover:block bg-blue-400 px-2" onClick={() => setShowAns(!showAns)}>{showAns? "Hide" : "Show"} Answer</button>}
        </div>
        <h3 className="text-lg">{quesArr.map((line, ind) => <span key={ind}>{line}{(ind < quesArr.length-1) && (showAns? <span className="bg-gray-200 rounded-full px-2 text-md">{data.fillAnswers[ind]}</span> : "_______")}</span>
        )}</h3>
        
        </div>
    </div>);
}