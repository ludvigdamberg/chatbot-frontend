import Image from "next/image";
import { LuSend } from "react-icons/lu";
export default function Home() {
  return (
    <div className=" w-full h-screen flex p-2">

      <div className=" flex flex-col w-full h-full bg-neutral-100 rounded-2xl p-1 blu">
        <div className=" w-full h-2/3 flex border border-neutral-200  rounded-2xl"></div>
        <div className=" w-full h-1/3 border border-neutral-200 bg-neutral-100 mt-1 rounded-2xl grid grid-cols-4">
          <div className=" col-span-3 flex border rounded-2xl bg-neutral-50 border-neutral-200 m-1"></div>
          <div className="flex ">
          <button className=" p-5 bg-blue-200 m-auto rounded-full text-2xl font-light text-center content-center text-white hover:animate-spin">
            <LuSend />
          </button>
          </div>

        
        </div>
      </div>

    </div>
  );
}
