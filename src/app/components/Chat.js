"use client";
import { useState } from "react";
import axios from "axios";
import { FiSend } from "react-icons/fi";
import SimpleBar from "simplebar";

const Chat = () => {
    const [messages, setMessages] = useState([]); // Stores chat messages
    const [userMessage, setUserMessage] = useState(""); // Stores input field text
    const [isLoading, setIsLoading] = useState(false); // Loading state for button
    const API_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL; // Ensure correct env variable

    const sendMessage = async () => {
        if (!userMessage.trim()) return; // Prevent sending empty messages

        // Append user message immediately
        const newMessages = [...messages, { role: "user", content: userMessage }];
        setMessages(newMessages);
        setUserMessage(""); // Clear input field
        setIsLoading(true); // Show loading state

        try {
            const response = await axios.post(API_URL, {
                message: userMessage,
                history: newMessages.map(msg => ({ role: msg.role, content: msg.content })), // Extract chat history
            }, {
                headers: { "Content-Type": "application/json" }
            });

            // Append bot response
            setMessages([...newMessages, { role: "assistant", content: response.data.response }]);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages([...newMessages, { role: "assistant", content: "Error: Unable to get response." }]);
        } finally {
            setIsLoading(false); // Hide loading state
        }
    };

    return (
        <div className="flex flex-col m-auto h-full w-full lg:max-h-[500px] lg:max-w-[500px] rounded-2xl backdrop-blur-xl border-2 border-neutral-200 p-4">
            {/* Chat Container */}
            <div className="flex-1 overflow-y-auto border-2 border-neutral-200 rounded-2xl shadow-md p-4 space-y-3 scroll ">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <p className={`px-4 py-2 rounded-xl font-thin text-xs lg:text-sm max-w-xs text-white ${msg.role === "user" ? "bg-blue-400/50" : "bg-gray-400/50"
                            }`}>
                            {msg.content}
                        </p>
                    </div>
                ))}
            </div>

            {/* Input Field & Button */}
            <div className="flex mt-4 space-x-2">
                <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Ask me something..."
                    className=" font-medium text-sm flex-1 px-4 py-2 border-2 border-neutral-200 rounded-full focus:outline-none focus:ring placeholder:text-neutral-300 text-neutral-300 focus:ring-blue-300"
                />
                <button
                    onClick={sendMessage}
                    className={` text-lg px-3 py-3 rounded-full text-white transition ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                        }`}
                    disabled={isLoading} // Disable button while waiting for response
                >
                    {isLoading ? "Sending..." : <FiSend /> }
                </button>
            </div>
        </div>
    );
};

export default Chat;
