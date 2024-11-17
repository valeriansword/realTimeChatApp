import { ChatState } from '../../context/ChatProvider.jsx';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import ChatLoading from './ChatLoading';
import "./mychats.css"

import { Avatar, AvatarImage } from "../ui/avatar.jsx"
export const getSender=(loggedUser,users)=>{
  return users[0]._id===loggedUser._id?users[1].name:users[0].name;

}
function MyChats() {
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat,socket, setSelectedChat,convo,setConvo, setChats, chats,setUser ,setChatInitiated,chatInitiated} = ChatState();
 
//   const fetchChats =  () => {
//     // console.log(user._id);
    

//     axios.get("http://localhost:3000/api/chat",{
//       headers:{
//         "content-type":"application/json",
//         Authorization:`Bearer ${user.token}`
//       }
//     }).then(result=>{
//       console.log("from the mychats ")
//       console.log(result.data);
//       setChats(result.data);
//       console.log("hi")
//       console.log(chats);
    
//     }).catch(err=>{
//       console.log(err);
//     })
   
//   };

  useEffect(() => {
    
   
    const fetchUsers=()=>{
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
       
        axios.get("https://real-time-chat-app-server-sigma.vercel.app/api/user/allUsers",{ 
          withCredentials: true,
                   headers:{
                    //  "content-type":"application/json",
                    Authorization:`Bearer ${loggedUser.token}`
                  }
                }).then(res=>{
                    setChats(res.data.users);
                    console.log("Chats:", res.data.users);
                    console.log(chats);
                }).catch(err=>{
                    console.log(err);
                })
    }
    fetchUsers();
  }, []);
  
  const handleChat=(id,e)=>{
    e.preventDefault();
   
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
    axios.get("https://real-time-chat-app-server-sigma.vercel.app/api/chat/message/receive/"+id,{
        headers:{
            //  "content-type":"application/json",
            Authorization:`Bearer ${loggedUser.token}`
          }
    }).then(res=>{
        setConvo(res.data.message);
        console.log(res.data.message)
    }).catch(err=>{
      if(err.response.data.message=="not found"){
        setConvo([])
      }
      console.log(err)});
    // socket.emit("join",id)
    setChatInitiated(true);
    setSelectedChat(chats.filter((chat)=>chat._id==id));
    console.log(selectedChat);
    
  }

  return (
    <div>
      <ToastContainer />
      <div className={`${selectedChat ? ' max-sm:hidden ' : ' '} flex `} >
        {/* left side */}
        <div className='bg-white w-[300px] p-2 rounded-md mb-[50px] h-[80vh] overflow-y-scroll'>
          <span className='flex justify-between '>
            <h1>My chats</h1>
            <button className='bg-[#00A36C] rounded-md text-white px-2 '>Create Group +</button>
          </span>
          {/* users list */}
          <div className='overflow-y-scroll mt-[10px]'>
            {
              chats ? (

                <div>
                  {
                    chats.map((chat, index) => (
                      <div key={index} onClick={(e)=>handleChat(chat._id,e)} className={`${selectedChat&&(selectedChat[0]._id === chat._id ? ' bg-[#3a5a40] text-[#dad7cd] ' : ' bg-[#f0f8ff] border border-black ')}  p-2 my-[10px] rounded-md flex space-x-2 mb-[10px] items-center  rounded-md p-2  hover:cursor-pointer `}>
                     
                      
                        <Avatar>
                            <AvatarImage src={`${chat.image}`} />
                     {/* <AvatarFallback>{user.name}</AvatarFallback> */}
                    </Avatar>
                        <div>
                           <h1>{chat.name}</h1>
                           <h1>{chat.email}</h1>
                        </div>
                    </div>
                      
                     
                     
                    ))
                  }
                </div>
              ) : (
                <ChatLoading />
              )
            }

          </div>
        </div>

      </div>

    </div>
  )
}

export default MyChats
