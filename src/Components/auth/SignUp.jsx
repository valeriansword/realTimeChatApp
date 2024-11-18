import React, { useEffect, useState } from 'react'
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io";
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {

    const [formData,setFormData]=useState({
        email:"",
        name:"",
        password:"",
        confirmPassword:"",
        image:"",
    });
    const navigate=useNavigate();
    const [show,setShow]=useState(false);
    const [loading,setLoading]=useState(false);
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});

    }

    const handlePic=(images)=>{
            setLoading(true);
            if(images===undefined){
                toast.error("Error! Something went wrong.");
            }
            else if(images.type==="image/jpg"||images.type==="image/jpeg" || images.type==="image/png"){
                const data=new FormData();
                data.append("file",images);
                data.append("upload_preset","chatApp")
                data.append("cloud_name","dduqbr4li")
                
                    axios.post("https://api.cloudinary.com/v1_1/dduqbr4li/image/upload",data).
                    then(res=>{
                        console.log(res.data)
                        setFormData({...formData,image:res.data.url.toString()});
                        setLoading(false);                   
                    }).catch(err=>{
                        console.log(err);
                        setLoading(false);
                    })
               
            }else{
                toast.error("error occured in uploading image");
                setLoading(false);
            }

    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true);
        if(!formData.name || !formData.password || !formData.confirmPassword || !formData.email ){
            toast.error("please fill all the ffeilds");
            setLoading(false);
            return;
        }
        if(formData.password !== formData.confirmPassword){
            toast.error("passwords and confirm password aren't match");
            return;
        }

        axios.post("https://real-time-chat-app-server-sigma.vercel.app/api/user",formData,
            {
                header:{
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
    const handleShow=()=>{
        setShow(!show);
    }
  return (
    <div className=''>
    <form className='flex flex-col ' onSubmit={handleSubmit}>
    <div className='mb-[20px] flex flex-col'>
            <label>Name</label>
            <input type='text' onChange={handleChange} name="name" value={formData.name} className='ring-2 ring-[#D9D9D9] outline-none rounded-md p-[5px]' placeholder='enter your name' required/>
        </div>
        <div className='mb-[20px] flex flex-col'>
            <label>Email</label>
            <input type='email' onChange={handleChange} name="email"  value={formData.email} className='ring-2 ring-[#D9D9D9] outline-none rounded-md p-[5px]' placeholder='enter your email' required/>
        </div>
        <div className='mb-[20px] flex flex-col'>
            <label>Password</label>
            <span className="relative"><input type={`${show?"text":"password"}`} onChange={handleChange} name="password"  value={formData.password} className='ring-2 w-full ring-[#D9D9D9] outline-none rounded-md p-[5px] focus:outline-[#82a16b] focus:border-none focus:outline-none'placeholder='enter your password' required/>
            <p onClick={handleShow} className='absolute right-2 top-2'>{show?"show":"hide"}</p></span>
        </div>
        <div className='mb-[20px] flex flex-col'>
        <span className="relative"> <label>Confirm Password</label>
            <input type={`${show?"text":"password"}`} onChange={handleChange} name="confirmPassword"  value={formData.confirmPassword} className='ring-2 w-full ring-[#D9D9D9] outline-none rounded-md p-[5px]'placeholder='enter your password' required/>
            <p onClick={handleShow} className='absolute right-2 bottom-2'>{show?"show":"hide"}</p></span>
        </div>
        <div className='mb-[20px]'>
            <input type="file" accept='image/*' p={1.5} onChange={(e)=>handlePic(e.target.files[0])}/>
        </div>
        <div className='flex space-x-[5px] mb-[20px]'>
            <input type='checkbox' />
            <p>I agree to terms and policy</p>
        </div>
        

        <button type="submit"  onClick={handleSubmit} className='w-full ring-2 ring-[#3A5B22] bg-[#3A5B22] text-[#dad7cd] rounded-md p-[5px] hover:bg-[#82a16b] hover:ring-[#82a16b]'>{loading?"Loading":"Sign in"}</button>
        <div className='mt-[30px]'>
                <span className=' flex items-center'>
                    <hr className='w-[50%]'/>
                    <p className=' '>Or</p>
                    <hr className='w-[50%]'/>
                </span>
                <span className='flex justify-around my-[30px] max-sm:flex-col max-sm:space-y-[10px]'>
                 <span className='border border-[#D9D9D9] flex items-center rounded-md px-[10px] max-sm:justify-center'><FcGoogle /><button className=' rounded-md px-[5px]'>Sign in with Google</button></span>
                <span className='border border-[#D9D9D9] flex items-center rounded-md px-[10px] max-sm:justify-center'><IoLogoApple /><button className=' rounded-md px-[5px]'>Sign in with Apple</button></span>
                </span>
                {/* <span className='flex justify-center'>
                <p className='text-center'>have an account?</p>
                <p className='text-center'> login</p>
                </span> */}
        </div>
        <ToastContainer />
    </form>
    </div>
  )
}

export default SignUp