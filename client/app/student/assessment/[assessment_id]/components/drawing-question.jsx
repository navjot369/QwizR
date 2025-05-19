"use client"

import React, { useState, useRef, useEffect } from "react"
import { Eraser, Pencil, RotateCcw } from "lucide-react"
import axios from "axios"

export default function DrawingQuestion({ question, onAnswer, nextQuestion }) {
    const canvasRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [color, setColor] = useState("#000000")
    const [brushSize, setBrushSize] = useState(5)
    const [tool, setTool] = useState("pencil")
    const [hasDrawn, setHasDrawn] = useState(false)
    const [submitted, setSubmitted] = useState(false);
    const [isUpload, setIsUpload] = useState(false);

    const [imageFile, setImageFile] = useState(null);

     const [result, setResult] = useState('');
  const [match, setMatch] = useState(null);

  const expectedLabel = "star"; 

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }, [])

    const startDrawing = (e) => {
        if (submitted) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        setIsDrawing(true)
        setHasDrawn(true)

        ctx.beginPath()

        let x, y
        if ("touches" in e) {
            const rect = canvas.getBoundingClientRect()
            x = e.touches[0].clientX - rect.left
            y = e.touches[0].clientY - rect.top
        } else {
            x = e.nativeEvent.offsetX
            y = e.nativeEvent.offsetY
        }

        ctx.moveTo(x, y)
    }

    const draw = (e) => {
        if (!isDrawing || submitted) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        ctx.lineWidth = brushSize
        ctx.lineCap = "round"
        ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color

        let x, y
        if ("touches" in e) {
            const rect = canvas.getBoundingClientRect()
            x = e.touches[0].clientX - rect.left
            y = e.touches[0].clientY - rect.top
        } else {
            x = e.nativeEvent.offsetX
            y = e.nativeEvent.offsetY
        }

        ctx.lineTo(x, y)
        ctx.stroke()
    }

    const stopDrawing = () => {
        setIsDrawing(false)
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        setHasDrawn(false)
    }

    const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
    setResult('');
    setMatch(null);
  };


    const handleCheckDrawing = (imageFile) => {
    if (!imageFile) return alert('Please upload a drawing first.');

    const reader = new FileReader();
    reader.onloadend = async () => {
        let base64;
        if(!reader.result) {
            base64 = imageFile.split(',')[1];
        }else{
            base64 = reader.result.split(',')[1]; // remove the header
        }
      const apiKey = 'AIzaSyBOH4D1c0UjrGc5h-d03seyA_0dHeCi3dg'; 

      try {
        const response = await axios.post(
          'https://api-inference.huggingface.co/models/microsoft/resnet-18',
          { inputs: base64 },
          {
            headers: {
              Authorization: 'Bearer',
              'Content-Type': 'application/json'
            }
          }
        );

        const predictions = response.data;
        const topPrediction = predictions[0]?.label || '';
        setResult(`Model Prediction: ${topPrediction}`);
        setMatch(topPrediction.toLowerCase() === expectedLabel.toLowerCase());
      } catch (error) {
        console.error(error);
        setResult('Error analyzing drawing');
      }
    };

    // If imageFile is a string (data URL), call reader.onloadend directly
    if (typeof imageFile === "string") {
      reader.onloadend();
    } else {
      reader.readAsDataURL(imageFile);
    }

  };

    const handleSubmit = () => {
        if(submitted) {
                console.log("herer");
            nextQuestion();
            return;
        }

        if (!submitted && hasDrawn) {

        const canvas = canvasRef.current
        if (!canvas) return

        const dataUrl = canvas.toDataURL("image/png")
        handleCheckDrawing(dataUrl);
        onAnswer(dataUrl, match);
        setSubmitted(true);
        }
    }

    const colorOptions = ["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FF9900"]

    return (
        <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">{question.title || "Draw your answer"}</h2>

            {!submitted && (
                <div className="mb-4 flex flex-wrap gap-2">
                    <div className="flex items-center space-x-2 mr-4">
                        <button
                            onClick={() => setTool("pencil")}
                            className={`p-2 rounded-lg ${tool === "pencil" ? "bg-purple-100 border-2 border-purple-500" : "bg-gray-100"}`}
                            title="Pencil"
                        >
                            <Pencil className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setTool("eraser")}
                            className={`p-2 rounded-lg ${tool === "eraser" ? "bg-purple-100 border-2 border-purple-500" : "bg-gray-100"}`}
                            title="Eraser"
                        >
                            <Eraser className="w-5 h-5" />
                        </button>
                        <button onClick={clearCanvas} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200" title="Clear Canvas">
                            <RotateCcw className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-center space-x-2">
                        <label htmlFor="brush-size" className="text-sm font-medium">
                            Size:
                        </label>
                        <input
                            id="brush-size"
                            type="range"
                            min="1"
                            max="20"
                            value={brushSize}
                            onChange={(e) => setBrushSize(Number.parseInt(e.target.value))}
                            className="w-24"
                        />
                    </div>

                    <div className="flex items-center space-x-1 ml-2">
                        {colorOptions.map((c) => (
                            <button
                                key={c}
                                onClick={() => setColor(c)}
                                className={`w-6 h-6 rounded-full ${color === c ? "ring-2 ring-offset-2 ring-gray-400" : ""}`}
                                style={{ backgroundColor: c }}
                                title={c}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div className="border-4 border-gray-300 rounded-lg overflow-hidden mb-4">
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={400}
                    className="w-full bg-white touch-none"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                />
            </div>

            {!isUpload? <button className="block mx-auto bg-blue-600 text-white p-2 rounded my-1" onClick={() => setIsUpload(true)}>Upload Image</button> :(<div className="p-4 border rounded-xl max-w-md mx-auto mt-6 mb-2 shadow">
      <h2 className="text-xl font-bold mb-2">🎨 Upload Drawing</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleCheckDrawing}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Check Drawing
      </button>

      {result && (
        <div className="mt-4 text-sm text-gray-700">
          {result}
          {match !== null && (
            <div className="mt-2 text-lg font-bold">
              {match ? (
                <span className="text-green-600">✅ Correct!</span>
              ) : (
                <span className="text-red-600">❌ Try again</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>)}

            <button
                onClick={handleSubmit}
                disabled={!hasDrawn}
                className={`
                    w-full py-3 rounded-xl font-bold text-white transition-all
                    ${!hasDrawn ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}
                `}
            >
                {submitted ? "Next Question" : "Submit Drawing"}
            </button>

            {submitted && (
                <div className="mt-4 p-4 rounded-lg bg-green-100 text-green-800">
                    <p className="font-bold">Your drawing has been submitted! 🎨</p>
                    <p>The teacher will review your artwork soon!</p>
                </div>
            )}



            
        </div>
    )
}
