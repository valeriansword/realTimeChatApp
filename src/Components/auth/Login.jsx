import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io";

import axios from "axios";
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
    const [formData,setFormData]=useState({
        email:"",
        password:"",
    });
    
    const navigate=useNavigate();
    const [show,setShow]=useState(false);
    const [loading,setLoading]=useState(false);
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});

    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true);
        if( !formData.password ||  !formData.email ){
            toast.error("please fill all the feilds");
            setLoading(false);
            return;
        }
        axios.post("https://real-time-chat-app-server-ikq4d5pk8-valerianswords-projects.vercel.app/api/user/login",formData,
            {
                headers:{
                    'Content-Type': 'application/json'
                }
            }
        ).then(res=>{
            toast.success("user registered successfully");
            localStorage.setItem("userInfo",JSON.stringify(res.data));
            setLoading(false);
            navigate("/chats");
        }).catch(err=>{
            console.log(err);
            setLoading(false)
            toast.error(err.response.data);
        })

        console.log(formData)

    }
  return (
    <div className=''>
    <form className='flex flex-col ' onSubmit={handleSubmit}>
        <div className='mb-[20px] flex flex-col'>
            <label >Email</label>
            <input type='email' onChange={handleChange} name="email" value={formData.email} className='ring-2 ring-[#D9D9D9] outline-none rounded-md p-[5px]' placeholder='enter your email' required/>
        </div>
        <div className='mb-[20px] flex flex-col'>
            <label>Password</label>
            <input type='password' onChange={handleChange} name="password" value={formData.password} className='ring-2 ring-[#D9D9D9] outline-none rounded-md p-[5px]'placeholder='enter your password' required/>
        </div>
        <div className='flex space-x-[5px] mb-[20px]'>
            <input type='checkbox' />
            <p>I agree to terms and policy</p>
        </div>
        <button type="submit" onClick={handleSubmit}  className='w-full ring-2 ring-[#3A5B22] bg-[#3A5B22] text-[#dad7cd] rounded-md p-[5px] hover:bg-[#82a16b] hover:ring-[#82a16b]'>{loading?"Loading":"LogIn"}</button>
        <div className='mt-[40px]'>
                <span className=' flex items-center'>
                    <hr className='w-[50%]'/>
                    <p className=' '>Or</p>
                    <hr className='w-[50%]'/>
                </span>
                <span className='flex justify-around my-[40px] max-sm:flex-col max-sm:space-y-[10px]'>
                 <span className='border border-[#D9D9D9] flex items-center rounded-md px-[10px] max-sm:justify-center '><FcGoogle /><button className=' rounded-md px-[5px]'>Sign in with Google</button></span>
                <span className='border border-[#D9D9D9] flex items-center rounded-md px-[10px]  max-sm:justify-center'><IoLogoApple /><button className=' rounded-md px-[5px]'>Sign in with Apple</button></span>
                </span>
                {/* <span className='flex justify-center'>
                <p className='text-center'>dont have an account?</p>
                <p className='text-center'> Signin</p>
                </span> */}
        </div>
        <ToastContainer />
    </form>
    </div>
  )
}

export default Login