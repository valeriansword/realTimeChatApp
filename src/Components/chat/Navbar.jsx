import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { Avatar, AvatarImage } from "../ui/avatar.jsx"

import { ChatState } from "../../context/ChatProvider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu.jsx"
import ProfileModal from './ProfileModel';
import { useNavigate } from 'react-router-dom';
import Sidebar from './SideBar';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';


function Navbar() {
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingchat] = useState(false);

  const { user,setSelectedChat,chats,setChats,selectedChat} = ChatState();
  const navigate = useNavigate();
 
  const [sideBar, setSideBar] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const logOut = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  }
  

//   const handleSearch=(searchRes)=>{
//     console.log(searchRes);
//     setSearch(searchRes);
//     setLoading(true);
//     if(!searchRes){
//       setLoading(true);
//       toast.warning("please enter the emailid or name");
//       return;
//     }
    
//     axios.get(`http://localhost:3000/api/user?search=${search}`,
//       {
//         headers:{
//           Authorization:`Bearer ${user.token}`
//         }
//       }
//     ).then(result=>{
//       console.log(result.data);
//       setLoading(false);
//         setSearchResult(result.data.users);
//     }).catch(err=>{
//       console.log(err);
//       toast.error("failed to load the result",err);
//     })
//   }
//   const accessChat=(userId)=>{
//     setLoadingchat(true);
//     axios.post("http://localhost:3000/api/chat",{userId},
//       {
//         headers:{
//           "Content-type":"application/json",
//           Authorization:`Bearer ${user.token}`
//         }
//       }
//     ).then(result=>{
    
//       if(!chats.find((c)=>c._id === result.data._id)){
//         console.log("inside if else")
//         console.log(c)
//         setChats([result.data,...chats])
//       }
//       setSelectedChat(result.data);
//       console.log("from the access chat"); 
//       console.log(result.data);
//       console.log(selectedChat.users)
//       setLoadingchat(false);
//       setSideBar(false);
//     }).catch(err=>{
//        console.log(err);
//       // toast.error("failed to load the result",err);
//     })

//   }
const handleSearch=(searchRes)=>{

}
 
  return (
    <div className=''>
      <div className="bg-[#ffffff] p-[15px] flex items-center justify-between">
        {/* search bar */}
        <span className='flex items-center relative'>        
              <input type='text' onClick={()=>setSideBar(true)} className='border  rounded-lg border-gray-400  outline-none pl-[30px] h-[40px] w-[250px] py-[10px]' placeholder='search user' />

          <IoSearch className=' absolute left-[5px]  ' />
        </span>

        <h1 className='text-lg font-semibold'>Let's chat</h1>
        <span className='flex items-center space-x-[10px]'>
          <IoNotifications size="20" />

          <DropdownMenu>
            <DropdownMenuTrigger> <Avatar>
              <AvatarImage src={`${user.user.image}`} className="object-cover"/>
              
            </Avatar></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpen(!isOpen)}>Profile</DropdownMenuItem>

              <DropdownMenuItem onClick={() => logOut()}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


        </span>
      </div>
      <ProfileModal isOpen={isOpen} onClose={() => setOpen(false)} user={user} />
      {/* <Sidebar sideBar={sideBar} onClose={()=>setSideBar(false)} handleSearch={handleSearch} accessChat={accessChat} searchResult={searchResult} loading={loading}/> */}
      <Sidebar sideBar={sideBar} onClose={()=>setSideBar(false)} handleSearch={handleSearch} />
        <ToastContainer />
    </div>
  )
}

export default Navbar
