import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

function ChatLoading() {
  return (
    <div className='space-y-2'>
      <Skeleton className="w-[200px] h-[40px] rounded-md" />
      <Skeleton className="w-[200px] h-[40px] rounded-md" />
      <Skeleton className="w-[200px] h-[40px] rounded-md" />
      <Skeleton className="w-[200px] h-[40px] rounded-md" />
      <Skeleton className="w-[200px] h-[40px] rounded-md" />

    </div>
  )
}

export default ChatLoading
