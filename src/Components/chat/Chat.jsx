import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import MyChats from './MyChats';
import ChatBox from './ChatBox';
import { ChatState } from '@/context/ChatProvider';
import "./chatPage.css"

function Chat() {
  const navigate=useNavigate();
  const {user}=ChatState();
  console.log(user)

  return (
    <div className='chatPage w-full'>
    {user && <Navbar />}   
    <div className='flex justify-between p-[20px] '>
          {user && <MyChats/> }
            {user && <ChatBox />}
    </div>
    </div> 
  )
}

export default Chat
