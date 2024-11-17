import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Login from './Login';
import backimage from "../../assets/bg.png";
import SignUp from './SignUp';


function Auth() {
    const [islogin,setIslogin]=useState(true);
    const navigate=useNavigate();
    useEffect(()=>{
      const user=JSON.parse(localStorage.getItem("userInfo"));
      if(user){
        toast.success("succesfully logged in");
        navigate("/chats");
        
        
      }
  
    },[navigate])
    return (
      <div className='w-full flex justify-center items-center min-h-screen p-[50px] bg-gradient-to-l from-[#ffffff]  to-[#3A5B22] max-sm:p-[20px]'>
  
        <div className={`w-full shadow-lg rounded-md flex ${islogin==true?' h-[600px] ':' min-h-[800px] '} bg-[#ffffff]`}>
          {/* login and signup component */}
          <div className='w-3/5  flex items-center justify-center max-sm:w-full'>
            <div className='space-y-[20px] w-[50%] max-sm:w-[90%]'>
              <span className='flex space-x-2 '>
               <button onClick={()=>setIslogin(true)} className={`${islogin==true?'bg-[#82a16b] border-[#82a16b] px-[20px] rounded-[30px] py-[5px]':''}`}>Login</button>
                <button onClick={()=>setIslogin(false)} className={`${islogin==false?'bg-[#82a16b] border-[#82a16b] px-[20px] rounded-[30px] py-[5px]':''}`}>Sign up</button>
              </span>
              {
                islogin==true?(
                  <Login />
                ):(
                  <SignUp />
                )
                
              }
           
            </div>
          </div>
          {/* side wallpaper */}
          <div className='w-2/5 max-sm:hidden'>
            <img src={backimage} className={`rounded-md bg-center object-cover ${islogin==true?' h-[600px] ':' min-h-[800px] '} w-full `}/>
          </div>
        </div>
              <ToastContainer />
      </div>
    )
}

export default Auth
