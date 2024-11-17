import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const ChatContext = createContext();

function ChatProvider({ children }) {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [chatInitiated, setChatInitiated] = useState(false);
  const [convo, setConvo] = useState([]);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setUser(userInfo);
    } else {
      navigate("/");
    }

    const newSocket = io.connect("https://real-time-chat-app-server-sigma.vercel.app/");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        socket,
        convo,
        setConvo,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        chatInitiated,
        setChatInitiated,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
