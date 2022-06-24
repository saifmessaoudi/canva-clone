import React from 'react'
import { useRouter } from 'next/router'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import db from '../firebase';
import { useSession } from 'next-auth/client';


const ModelRow=({ doc })=> {
    const router = useRouter();
    const [session] = useSession();
    
   
  
    
    return (
      <div className='relative' >
      <div onClick={() => router.push(`/doc/${doc?.id}`)} className=" w-[200px] h-[300px]   hover:border-blue-800  hover:border-opacity-70 border-opacity-60 text-gray-700 cursor-pointer  border-2 ">
        
      <div className='bg-gray-500 absolute w-[197px] h-[233px] opacity-5 hover:opacity-10'></div>
        <div className='aboslute w-full   '><img src={doc?.image}></img></div>
        <hr className=' absolute bottom-16 w-[196px] border-gray-200' ></hr>
        <div className='absolute bottom-9 font-semibold  left-4 text-sm'>{doc?.fileName}</div>
  
        
        
        
       
  
        
         
      </div>
      <div className='absolute bottom-3.5 font-semibold  left-4 text-xs opacity-50 '>{doc?.Description}</div>
      
      
      </div>
  
    );
}

export default ModelRow