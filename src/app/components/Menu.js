"use client";
import Link from "next/link";
import { FiGithub } from "react-icons/fi";
import { FaWrench } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });


const Menu = ({ setShowChat }) => {

    const [chatData, setChatData] = useState(null);
    const [gitData, setGitData] = useState(null);
    const [buildData, setBuildData] = useState(null);

    useEffect(() => {
        fetch("/chat.json") // Load from public folder
            .then((res) => res.json())
            .then((data) => setChatData(data))
            .catch((err) => console.error("Error loading animation:", err));

        fetch("/build.json") // Load from public folder
            .then((res) => res.json())
            .then((data) => setBuildData(data))
            .catch((err) => console.error("Error loading animation:", err));

        fetch("/github.json") // Load from public folder
            .then((res) => res.json())
            .then((data) => setGitData(data))
            .catch((err) => console.error("Error loading animation:", err));
    }, []);


    return (
        <div className="grid grid-rows-3 lg:grid-rows-2 gap-1 h-full w-full lg:max-h-[400px] lg:max-w-[500px]">
            {/* Top Section - Navigate to Chat */}
            <div
                className="lg:grid lg:grid-cols-2 flex flex-col row-span-2 lg:row-span-1 bg-blue-300 text-white text-lg font-semibold rounded-lg cursor-pointer transition hover:scale-[101%] "
                onClick={() => setShowChat(true)}
            >
                <div className=" flex-col p-2">
                    <div className=" font-bold text-2xl flex space-x-2 "><p>{"Start Chatting"}</p>  <IoMdChatbubbles className="  my-1 text-2xl" /></div>
                    <p className=" text-xs font-extralight">{"Say hello to my assistant! Here you can chat and get answers from someone full of information about me; personal or professional, that is up to you. "}</p>
                </div>
                <div className="flex my-auto lg:my-0"> <Lottie animationData={chatData} loop={true} className=" max-w-[200px] max-h-[200px] mx-auto my-auto" /></div>
            </div>

            {/* Bottom Section - Responsive Behavior */}
            <div className="grid gap-1 lg:grid-cols-3 grid-cols-2 grid-rows-1 ">
                {/* Left Section - About (2/3 on large, square on mobile) */}
                <Link href="https://github.com/ludvigdamberg/chatbot-frontend"
                    className="lg:grid lg:grid-cols-2 flex flex-col bg-neutral-950 text-white text-sm font-semibold rounded-lg cursor-pointer transition hover:scale-[101%] lg:col-span-2 lg:h-full h-full"
                >
                    <div className=" flex">
                        <p className=" m-2 font-bold text-2xl">{"Github"}</p>
                        <FiGithub className=" my-3 text-2xl" />
                    </div>
                    <div className="flex mx-auto lg:mr-auto my-auto lg:my-0"> <Lottie animationData={gitData} loop={true} className=" w-[80px] h-[80px] lg:w-[150px] lg:h-[150px] my-auto" /></div>




                </Link>

                {/* Right Section - More Info (1/3 on large, square on mobile) */}
                <Link href="https://www.linkedin.com/in/ludvigdamberg/"
                    className=" flex flex-col p-2 bg-amber-600 text-white text-sm rounded-lg cursor-pointer transition hover:scale-[101%] lg:col-span-1 lg:h-full h-full"
                >
                    <div className="flex space-x-1">
                        <p className=" font-bold text-2xl">{"How to"}</p>
                        <FaWrench className=" text-2xl my-1" />
                    </div>
                    <div className="flex mx-auto my-auto"> <Lottie animationData={buildData} loop={true} className=" w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] mx-auto my-auto" /></div>

                </Link>
            </div>
        </div>
    );
};

export default Menu;
