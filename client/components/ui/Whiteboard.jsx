'use client'; 

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import html2canvas from 'html2canvas'; 
import axios from 'axios';
import "@excalidraw/excalidraw/index.css";

const Excalidraw = dynamic(
  () => import('@excalidraw/excalidraw').then(mod => mod.Excalidraw),
  { ssr: false }
);

export default function Whiteboard() {
  const excalidrawRef = useRef(null);

  const handleSaveScreenshot = async () => {
    const container = document.querySelector('.excalidraw'); 

    if (!container) return;

    const canvasImage = await html2canvas(container);
    const blob = await new Promise(resolve => canvasImage.toBlob(resolve, 'image/png'));

    // Optional: preview
    // const imageURL = URL.createObjectURL(blob);
    // window.open(imageURL);

    const formData = new FormData();
    formData.append('image', blob, 'drawing.png');

    try {
      const res = await axios.post('/api/upload', formData);
      alert('Screenshot uploaded successfully!');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <div>
      <div style={{ height: '500px' , width: '500px'}}>
        <Excalidraw ref={excalidrawRef} />
      </div>
      <button onClick={handleSaveScreenshot} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
        Save & Upload Screenshot
      </button>
    </div>
  );
}
