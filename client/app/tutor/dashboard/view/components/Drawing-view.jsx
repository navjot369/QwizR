"use client"
import { useState, useEffect } from "react";
import clsx from "clsx";

export default function DrawingView({ data, num, showAnsGlobal }) {
    const [ showAns, setShowAns ] = useState(false);
    useEffect(() => {
        if(showAnsGlobal) setShowAns(true);
    }, [])

    return(<div className="my-8 grid grid-cols-[30px_1fr] w-full group">
        <div className="flex p-2 justify-center text-xl">{num}.</div>
        <div>
        <div className="flex gap-2">
        <h5 className="text-xs text-gray-600 border-2 border-gray-600 rounded-2xl w-fit bg-gray-200 font-bold px-2">Drawing</h5>
        {/* {!showAnsGlobal && <button className="hidden text-xs rounded-full font-bold group-hover:block bg-blue-400 px-2" onClick={() => setShowAns(!showAns)}>{showAns? "Hide" : "Show"} Answer</button>} */}
        </div>
        <h3 className="text-lg">{data.title}</h3>
        </div>
    </div>);
}