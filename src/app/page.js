"use client";
import Chat from "./components/Chat";

export default function Home() {
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
      <div className="absolute inset-0 bg-black opacity-50  z-10"></div>

      {/* Chat Component */}
      <div className="relative z-20 w-full h-full flex items-center justify-center p-4">
        <Chat />
      </div>
    </div>
  );
}
