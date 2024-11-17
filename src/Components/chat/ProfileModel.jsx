import React from 'react'
import "./ProfileModal.css"
import { IoCloseSharp } from "react-icons/io5";

function ProfileModal({isOpen,onClose,user}) {
    
  return (
    <div>
  
       {isOpen &&(
         <div className="overlay">
         <div className="overLayModal-background" >
         <div className="overLayModal-container">
            
         <div className=" p-6  rounded-md ">
            {/* header */}
            <div className='flex justify-between items-center'>
                <span>
                    <h1 className='text-xl font-normal '>{user.user.name}</h1>
                </span>
                <span onClick={onClose} className='mt-[2px]'>
                    <IoCloseSharp size="25"/>
                </span>
            </div>
            {/* profile */}
            <div className='flex items-center justify-center'>
                <img src={user.user.image} className='h-[200px] w-[200px] rounded-full '/>
            </div>
            <h1 className='text-center'>{user.user.email}</h1>


        </div>
        </div>
        </div>
        </div>
       )}
   
     

    </div>
  )
}

export default ProfileModal
