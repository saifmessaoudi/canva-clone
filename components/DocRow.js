import React from 'react'
import { useRouter } from 'next/router'
import DescriptionIcon from '@material-ui/icons/Description';
import db from '../firebase';
import { useSession } from 'next-auth/client';

const DocRow=({ doc }) =>{
  const [session] = useSession();

  function deletedoc(){
    db
    .collection('userDocs')
    .doc(session?.user.email)
    .collection('docs').doc(doc?.id).delete()
  }

    const router = useRouter();

    return (
      <div className='relative' >
      <div onClick={() => router.push(`/doc/${doc?.id}`)} className=" w-[130px] h-[200px]   hover:border-blue-800  hover:border-opacity-70 border-opacity-60 text-gray-700 cursor-pointer  border-2 ">
        
      <div className='bg-gray-500 absolute w-[150px] h-[200px] opacity-5 hover:opacity-10'></div>
        <div className='aboslute top-8 w-full   '><img src={doc?.image}></img></div>
        
        <hr className=' absolute bottom-16 w-[126px] border-gray-200' ></hr>
        <div className='bg-white  w-[126px] h-[65px]  absolute bottom-0 '></div>
        <div className='absolute bottom-9 font-semibold  left-4 text-xs '>{doc?.fileName}</div>
  
        
      </div>
     
      <div className='absolute top-[170px] right-0 hover:bg-red-500'>
      <button onClick={deletedoc} className='rounded-lg hover:bg-red-400 opacity-40 hover:opacity-90  hover:shadow-md absolute '>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>
      </button>
      </div>
      
      </div>
      
  
    )
}

export default DocRow