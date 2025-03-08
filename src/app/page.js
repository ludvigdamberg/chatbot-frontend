"use client";
import { useState } from "react";
import Chat from "./components/Chat";
import Menu from "./components/Menu";

export default function Home() {
  const [showChat, setShowChat] = useState(false); // State to toggle views

  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for better readability */}
      <div className="absolute inset-0 backdrop-blur-sm z-10"></div>

      {/* Content Switch */}
      <div className="relative z-20 w-full h-full flex items-center justify-center p-4">
        {showChat ? <Chat setShowChat={setShowChat} /> : <Menu setShowChat={setShowChat} />}
      </div>
    </div>
  );
}
