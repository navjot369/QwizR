"use client";
import Whiteboard from "@/components/ui/Whiteboard";

export default function Drawing() {
  return(<div>
    <h1 className="text-3xl text-blue-600 p-11">QwizR</h1>
    <div className="flex justify-center">
    <Whiteboard />
    </div>
  </div>)
};
