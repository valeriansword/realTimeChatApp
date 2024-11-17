import { useState } from "react";
import ChatLoading from "./ChatLoading";
//import UserListItem from "./UserListItem";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
function Sidebar({ sideBar, onClose,handleSearch}) {

   const [searchRes,setSearchRes]=useState("");
   
    return (
        <>

            {
                sideBar && (
                    <>
                        <div
                            className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${sideBar ? "opacity-100" : "opacity-0 pointer-events-none"
                                }`}
                            onClick={onClose}
                        ></div>

                        {/* Sidebar */}
                        <div
                            className={`fixed top-0 left-0 h-full w-[280px] bg-white shadow-lg z-50 transform transition-transform ${sideBar ? "translate-x-0" : "-translate-x-full"
                                }`}
                        >
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-500 hover:text-gray-900"
                            >
                                Close
                            </button>

                            {/* Sidebar content */}
                            <div className="">
                                <h2 className="p-4 text-lg font-bold">Search User</h2>
                               <hr className="mb-2"/>
                                <span className="p-4 flex justify-between">
                                    <input type="text"  className="border border-gray-400 outline-none rounded-sm pl-2" placeholder="search by name or email"/>
                                    <button className="bg-[#50C878] hover:bg-[#00A36C] p-2  rounded-md text-white">Go</button>
                                </span>
                                <div className="mt-[10px] p-4">
                                    {/* {
                                        loading?<ChatLoading />:(
                                            searchResult?.map((user,index)=>(
                                                <div onClick={()=>accessChat(user._id)} className="flex space-x-2 mb-[10px] items-center bg-gray-100 rounded-md p-2 hover:bg-gray-300 hover:cursor-pointer" key={index} >
                                                  <Avatar>
                                                        <AvatarImage src={`${user.pic}`} />
                                                
                                                </Avatar>
                                                    <div>
                                                       <h1>{user.name}</h1>
                                                       <h1>{user.email}</h1>
                                                    </div>
                                                </div>
                                            ))
                                        )
                                    } */}
                                </div>
                            </div>
                        </div>
                    </>

                )
            }



        </>
    );
}
export default Sidebar