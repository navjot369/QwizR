"use client"
import { useState, useEffect } from "react";
import clsx from "clsx";

export default function MatchingView({ data, num, showAnsGlobal }) {
    const [ showAns, setShowAns ] = useState(false);
    const [leftArr, setLeftArr] = useState([]);
    const [rightArr, setRightArr] = useState([]);
    const [rightShuffleArr, setSuffleArr] = useState([]);

    useEffect(() => {
        if(showAnsGlobal) setShowAns(true);
        let left = [];
        let right = [];

        for (const obj of data.matching) {
            left.push(obj.l);
            right.push(obj.r);
        }

        setLeftArr(left);
        setRightArr(right);
    }, [])

    // console.log(leftArr);

    useEffect(() => {
        setSuffleArr(shuffleArray([...rightArr]));
    }, [rightArr]);



    return(<div className="my-8 grid grid-cols-[30px_1fr] w-full group">
        <div className="flex p-2 justify-center text-xl">{num}.</div>
        <div>
        <div className="flex gap-2">
        <h5 className="text-xs text-gray-600 border-2 border-gray-600 rounded-2xl w-fit bg-gray-200 font-bold px-2">Matching</h5>
        {!showAnsGlobal && <button className="hidden text-xs rounded-full font-bold group-hover:block bg-blue-400 px-2" onClick={() => setShowAns(!showAns)}>{showAns? "Hide" : "Show"} Answer</button>}
        </div>
        <div className="grid grid-cols-2 w-fit gap-12 text-lg p-2">
            <div className="max-w-fit">
                <p className="bg-gray-300 rounded-full px-1 w-fit m-auto text-sm font-bold">Left</p>
                {leftArr.map((item, ind) => (<p key={ind}>{item}</p>))}
            </div>

            <div className="text-right">
                <p className={clsx("rounded-full px-1 w-fit m-auto text-sm font-bold", showAns? "bg-green-500" : "bg-gray-300")}>Right</p>
            {showAns? rightArr.map((item, ind) => (<p key={ind}>{item}</p>)) : 
            rightShuffleArr.map((item, ind) => (<p key={ind}>{item}</p>))}
            </div>
        </div>
        </div>
    </div>);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap
    }
    return array;
  }