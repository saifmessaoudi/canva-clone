import React from 'react'
import { useRouter } from 'next/router'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import db from '../firebase';
import { useSession } from 'next-auth/client';


const ModeRow=({ doc })=> {
    const router = useRouter();
    const [session] = useSession();
    
   
  
    
     return (
      <div className='relative' >
      <div onClick={() => router.push(`/doc/${doc?.id}`)} className=" w-[130px] h-[200px]   hover:border-blue-800  hover:border-opacity-70 border-opacity-60 text-gray-700 cursor-pointer  border-2 ">
        
      <div className='bg-gray-500 absolute w-[150px] h-[200px] opacity-5 hover:opacity-10'></div>
        <div className='aboslute top-8 w-full   '><img src={doc?.image}></img></div>
        
        <hr className=' absolute bottom-16 w-[126px] border-gray-200' ></hr>
        <div className='bg-white  w-[126px] h-[65px]  absolute bottom-0 '></div>
        <div className='absolute bottom-9 font-semibold  left-4 text-xs '>{doc?.fileName}</div>
        <div className='absolute bottom-4 font-semibold opacity-50 left-4 text-xs '>{doc?.Description}</div>
  
        
      </div>
     
      
      
      
      </div>
  
    )
   
}

export default ModeRow