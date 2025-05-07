"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import MCQView from "../components/MCQ-view";
import FillUpsView from "../components/FillUps-view";
import MatchingView from "../components/Matching-view";
import DrawingView from "../components/Drawing-view";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function ViewQuestion() {
  const [token, setToken] = useState("");
  const [type, setType] = useState(null);
  const [amount, setAmount] = useState(10);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [dataOrg, setDataOrd] = useState(null);
  const [allData, setAllData] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [showAns, setShowAns] = useState(false);

  useEffect(() => {
    const LocalToken = localStorage.getItem("auth");
    if (!LocalToken) {
      window.location.href = "/";
    } else {
      setToken(LocalToken);
    }
  }, []);

  useEffect(() => {
    if (token.length == 0) {
      return;
    }
    // const res = await axios.post(`${process.env.NODE_PUBLIC_API}/tutor/view/questions`);
    const res = axios.get("http://localhost:5050/tutor/view/questions", {
      headers: {
        Authorization: token,
      },
    });
    res
      .then((data) => {
        console.log(data.data);
        setData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.message == "Network Error") {
          toast.error("Connection to server failed");
          return;
        }
        const message = err.response.data;
        if (message == "Token expired") {
        }
        console.log("Error in getting questions", err);
        console.log(message);
      });
  }, [token]);

  return (
    <div>
      <h1 className="text-blue-500 font-bold text-4xl">View Question</h1>
      <p className="text-gray-500 text-sm">
        Here are all the question created by you.
      </p>
      {isLoading ? (
        <div className="py-10">
        <QuestionLoading />
        <QuestionLoading />
        <QuestionLoading />
        </div>
      ) : (
        data.map((ques, ind) => {
          if (ques.type == "MCQ") {
            return (
              <MCQView
                data={ques}
                key={ind}
                num={start + ind + 1}
                showAnsGlobal={showAns}
              />
            );
          } else if (ques.type == "Fill Ups") {
            return (
              <FillUpsView
                data={ques}
                key={ind}
                num={start + ind + 1}
                showAnsGlobal={showAns}
              />
            );
          } else if (ques.type == "Matching") {
            return (
              <MatchingView
                data={ques}
                key={ind}
                num={start + ind + 1}
                showAnsGlobal={showAns}
              />
            );
          } else if (ques.type == "Drawing") {
            return (
              <DrawingView
                data={ques}
                key={ind}
                num={start + ind + 1}
                showAnsGlobal={showAns}
              />
            );
          }
        })
      )}
    </div>
  );
}


function QuestionLoading() {
    return(<div className="w-full">
        <Skeleton count={1}/>
        <div className="w-1/2">
        <Skeleton count={4} />
        </div>

        <Skeleton count={1} className="mt-5" />
        <div className="flex">
        <Skeleton circle height="40px" width="40px" count={4}/>
        </div>

    </div>);
}