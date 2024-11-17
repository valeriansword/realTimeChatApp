import { useState } from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Auth from './Components/auth/Auth'
import Chat from './Components/chat/Chat'
   
import ChatProvider from './context/ChatProvider'
import { io } from 'socket.io-client'


function App() {
 

  return (
  
      <BrowserRouter>
        <ChatProvider> 
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/chats" element={<Chat />} />
         {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
        </ChatProvider> 
      </BrowserRouter>
      
    
  )
}

export default App
