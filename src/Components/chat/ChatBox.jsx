import { ChatState } from '../../context/ChatProvider';
import React, { useEffect, useRef, useState } from 'react'
import { MdVideoCall } from "react-icons/md";
import { PiPhoneCall } from "react-icons/pi";


import { Avatar, AvatarImage } from "../ui/avatar.jsx"
import "./chatBox.css"
import axios from 'axios';

function ChatBox() {
    const [loggedUser, setLoggedUser] = useState();
 
    const { user, selectedChat, setSelectedChat,socket, convo,setConvo,setChats, chats,setUser ,setChatInitiated,chatInitiated} = ChatState();
    const [message,setMessage]=useState();
    const handleSubmit=(e)=>{
        e.preventDefault();
        const recId=selectedChat[0]._id
        const storedUserInfo = localStorage.getItem("userInfo");
        
        if (!storedUserInfo) {
            console.error("User info not found in localStorage");
            return;
        }

        const loggedUser = JSON.parse(storedUserInfo);

        if (!loggedUser || !loggedUser.token) {
            console.error("Logged user or token is missing");
            return;
        }

        setLoggedUser(loggedUser);
        axios.post("https://real-time-chat-app-server-sigma.vercel.app/api/chat/message/send/"+recId,{content:message},{
            headers:{
                //  "content-type":"application/json",
                Authorization:`Bearer ${loggedUser.token}`
              }
        }).then(res=>{
            setConvo([...convo,{content:message,sender:user.user.id}]);
            setMessage('')
        }).catch(err=>{console.log(err)});
    }

    useEffect(()=>{
        socket.emit("join",user.user.id);

    },[])

    useEffect(() => {
        if (!selectedChat) return;
    
        const recId = selectedChat[0]._id; // Ensure `selectedChat` is defined before accessing it.
    
        const handleNewMessage = (message) => {
            setConvo((con) => [...con, { sender: message.sender, content: message.content }]);
        };
    
        socket.emit("join", user.user.id); // Ensure `user.user.id` is defined before this.
    
        socket.on("newMessage", handleNewMessage);
    
        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, selectedChat, user.user.id]);

    const chatEndRef = useRef(null); // Ref for the end of the chat
    const messageContainerRef = useRef(null); // Ref for the message container

    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    };
    

    useEffect(() => {
        scrollToBottom(); // Scroll to bottom when new messages are added
    }, [convo]);

  return (
    <div className='chatBox w-3/4 relative bg-white rounded-md mb-[20px] '>
       {chatInitiated?(
        <>
            {/* receiver profile */}
           <div >
            {selectedChat &&(
                <div className='flex justify-between bg-[#dad7cd] p-2 rounded-md'>
                    <span className='flex space-x-2'>
                        <Avatar>
                            <AvatarImage src={`${selectedChat[0].image}`} />
                     {/* <AvatarFallback>{user.name}</AvatarFallback> */}
                    </Avatar>
                    <h1 className='text-xl font-bold text-black'>{selectedChat[0].name}</h1>
                    </span>                   
                      
                        <span className='flex cursor-pointer space-x-2 border border-gray-900 p-2 rounded-md divide-x divide-gray-900  '>
                                <MdVideoCall className='text-black text-[30px] hover:bg-gray-400 hover:rounded-md' onClick={()=>alert("video call will not work")}/>
                                <PiPhoneCall className='text-black text-[30px] hover:bg-gray-400 hover:rounded-md'  onClick={()=>alert("audio call will not work")}/>
                        </span>
                    
                </div>
            )}
           </div>
           {/* message filed */}
           <div className='overflow-y-auto space-y-[10px] mt-[10px] h-[400px]'  ref={messageContainerRef} >
                {
                    convo &&(
                        convo.map((convos,index)=>(
                            <div key={index} className={`flex px-4 ${convos.sender===user.user.id?" justify-end ":" justify-start "}`}>
                                <h1 className={`text-xl font-bold ${convos.sender===user.user.id?" bg-blue-500 text-white px-2 rounded-md ":" bg-white text-black px-2 rounded-md "}`}>{convos.content}</h1>
                               
                            </div>
                        ))
                    )
                }
                  <div ref={chatEndRef} style={{ height: 0, margin: 0, padding: 0 }}></div> 
            </div>
           {/* down form field */}
           
           <div className='fixed absolute bottom-0 p-4 right-0 left-0 '>
           <form className='flex' onSubmit={handleSubmit}>
                <input type="text" placeholder='type your text' className='w-full p-2 rounded-l-md outline-none' value={message} onChange={(e)=>setMessage(e.target.value)} />
                <button className="bg-blue-400 rounded-r-md  px-2 text-lg font-bold text-white">send</button>

           </form>
           </div>
        </>
       ):(
        <div>
            <h1 className='text-center text-white text-xl font-bold '>welcome to lets Chat </h1>
        </div>
       )
    }
    </div>
  )
}

export default ChatBox
