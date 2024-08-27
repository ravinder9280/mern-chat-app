import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useNavigate } from "react-router-dom";

import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { IoArrowBack } from "react-icons/io5";
const MessageContainer = () => {
  const Navigate=useNavigate();
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // cleanup function (unmounts)
    console.log(selectedConversation);
    
    // return () => setSelectedConversation(null);
  }, [selectedConversation]);

  return (
    <div
      className={`flex ${
        selectedConversation ? "h-screen " : "h-full"
      }  rounded-lg overflow-hidden w-full   text-center m-2  bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 h-2/3 `}
    >
      <div
        className={`md:min-w-[450px]  w-full flex flex-col ${
          selectedConversation ? "md:w-3/4" : "w-full"
        }`}
      >
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            {/* Header */}
            <div className="  items-center  bg-slate-500 flex  px-4 py-2 mb-2">
              <IoArrowBack  onClick={()=> Navigate('/')} className=" text-zinc-100 cursor-pointer text-xl"/>
            <span className="mx-2">
              
              
              <span className="label-text">To:</span>{" "}
              <span className="text-gray-900 font-bold">
                {selectedConversation.fullName}
              </span>
              </span>

            </div>
            <Messages />
            <MessageInput />
          </>
        )}
      </div>
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  const { selectedConversation, setSelectedConversation } = useConversation();

  return (
    <div
      className={`flex items-center justify-center w-full h-full ${
        selectedConversation ? "hidden" : ""
      }`}
    >
      <div
        className={`px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2`}
      >
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};