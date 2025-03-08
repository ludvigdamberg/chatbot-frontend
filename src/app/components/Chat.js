"use client";
import { useState } from "react";
import axios from "axios";
import { FiSend } from "react-icons/fi";
import { RiNextjsLine } from "react-icons/ri";
import { FaAws } from "react-icons/fa";
import { AiOutlinePython } from "react-icons/ai";
import { TbFileLambda } from "react-icons/tb";
import { IoMdChatbubbles } from "react-icons/io";
import { IoArrowBackCircleOutline } from "react-icons/io5";


const Chat = ({ setShowChat }) => {
    const [messages, setMessages] = useState([]); // Stores chat messages
    const [userMessage, setUserMessage] = useState(""); // Stores input field text
    const [isLoading, setIsLoading] = useState(false); // Tracks if bot is typing
    const API_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL; // Ensure correct env variable

    const sendMessage = async () => {
        if (!userMessage.trim()) return; // Prevent sending empty messages

        // Append user message immediately
        const newMessages = [...messages, { role: "user", content: userMessage }];
        setMessages(newMessages);
        setUserMessage(""); // Clear input field
        setIsLoading(true); // Show typing animation

        try {
            const response = await axios.post(API_URL, {
                message: userMessage,
                history: messages.map(msg => ({ role: msg.role, content: msg.content })), // Extract chat history
            }, {
                headers: { "Content-Type": "application/json" }
            });

            // Append bot response
            setMessages(prevMessages => [
                ...prevMessages,
                { role: "assistant", content: response.data.response }
            ]);
        } catch (error) {
            console.error("Error sending message:", error);
        }
        setIsLoading(false)

    };

    return (
        <div className="flex flex-col m-auto h-full w-full md:max-h-[400px] md:max-w-[500px] space-y-1">
            <div
                className="w-full h-10 flex items-center px-5 bg-blue-400 text-white text-sm font-base rounded-2xl cursor-pointer transition hover:bg-blue-300"
                onClick={() => setShowChat(false)}
            >
                <IoArrowBackCircleOutline className=" mr-2 text-base" /> {"Back to Menu"}
            </div>

            <div className="flex flex-col m-auto h-full w-full rounded-2xl backdrop-blur-xl border border-neutral-200 p-4 pt-1 shadow-2xl">
                <div className=" text-xs flex text-neutral-300 mb-1">
                    <div className=" my-auto ml-8 mr-auto flex flex-row space-x-1 ">
                        <p className=" my-auto">{" Chat With Ludvig"}</p>
                        <IoMdChatbubbles className=" my-auto text-sm" />
                    </div>
                    <div className="flex ml-auto my-auto mr-8 space-x-3">
                        <RiNextjsLine className=" my-auto text-sm hover:text-yellow-500 ease-in-out duration-100" />
                        <FaAws className=" my-auto text-sm hover:text-yellow-500 ease-in-out duration-100" />
                        <TbFileLambda className=" my-auto text-sm hover:text-yellow-500 ease-in-out duration-100" />
                        <AiOutlinePython className=" my-auto text-sm hover:text-yellow-500 ease-in-out duration-100" />
                    </div>
                </div>
                {/* Chat Container */}
                <div className="flex-1 overflow-y-auto border border-neutral-200 rounded-2xl shadow-md p-4 space-y-3 scroll ">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <p className={`px-4 py-2 rounded-xl font-thin text-xs lg:text-sm max-w-xs text-white ${msg.role === "user" ? "bg-blue-400/80" : "bg-purple-400/80"
                                }`}>
                                {msg.content}
                            </p>
                        </div>
                    ))}

                    {/* Show Typing Animation at Bottom when Bot is Typing */}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-400/50 text-white px-4 py-2 rounded-xl">
                                <p className="dot-typing"></p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Field & Button */}
                <div className="flex mt-4 space-x-2">
                    <input
                        type="text"
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        placeholder="Ask me something..."
                        className="font-base text-xs flex-1 px-4 py-2 border border-neutral-200 rounded-full focus:outline-none focus:ring placeholder:text-neutral-300 text-neutral-300 focus:ring-blue-300"
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button
                        onClick={sendMessage}
                        className={`text-lg px-3 py-3 rounded-full text-white transition ${isLoading ? "bg-purple-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-300"
                            }`}
                        disabled={isLoading} // Disable button while waiting for response
                    >
                        <FiSend />
                    </button>
                </div>

                {/* Typing Animation CSS */}
                <style jsx>{`
                .dot-typing {
                    display: inline-block;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .dot-typing::after {
                    content: " .";
                    animation: dots 1.5s steps(3, end) infinite;
                }
                @keyframes dots {
                    0% { content: " "; }
                    33% { content: " ."; }
                    66% { content: " .."; }
                    100% { content: " ..."; }
                }
            `}</style>
            </div>
        </div>

    );
};

export default Chat;
