import React from 'react';
import { useRouter } from 'next/router'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import db from '../firebase';
import { useSession } from 'next-auth/client';

const AdminDoc = ({ doc }) => {

  const router = useRouter();
  const [session] = useSession();
  
  function deletedoc(){
    db
    .collection('Docs')
    .doc(doc.id)
    .collection('Doc').doc(doc?.id).delete()
  }

  
  return (
    <div className='relative' >
    <div onClick={() => router.push(`/doc/${doc?.id}`)} className=" w-[200px] h-[300px]   hover:border-blue-800  hover:border-opacity-70 border-opacity-60 text-gray-700 cursor-pointer  border-2 ">
      
    <div className='bg-gray-500 absolute w-[197px] h-[233px] opacity-5 hover:opacity-10'></div>
      <div className='aboslute w-full   '><img src={doc?.image}></img></div>
      <hr className=' absolute bottom-16 w-[196px] border-gray-200' ></hr>
      <div className='absolute bottom-9 font-semibold  left-4 text-sm'>{doc?.fileName}</div>

      
      <div> 
        <img src="images/logo1.png" className='w-[18px] h-[18px] absolute opacity-90 bottom-2.5 left-4'></img>
      </div>
      
     

      
       
    </div>
    <div className='absolute bottom-3.5 font-semibold  left-12 text-xs opacity-40 '>{doc?.timestamp?.toDate().toLocaleDateString("en-us",{day:'numeric',month:'short',year:'numeric'})}</div>
    <button onClick={deletedoc} className='rounded-lg hover:bg-gray-200 opacity-40 hover:opacity-90  hover:shadow-md absolute bottom-6 left-[168px] '>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>
      </button>
    
    </div>

  );
}

export default AdminDoc;
