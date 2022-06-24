import React from 'react';
import { Icon, IconButton, Link } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import DescriptionIcon from '@material-ui/icons/Description';
import SearchIcon from '@material-ui/icons/Search';
import AppsIcon from '@material-ui/icons/Apps';
import { signOut } from 'next-auth/client';
import { useSession } from 'next-auth/client';
import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {showModal,handleSubmit,docNameFieldRef,} from '../pages/index'
import Modal from '@material-ui/core/Modal';
import  db  from '../firebase';
import firebase from 'firebase';
import Login from '../components/Login';
import { useRouter } from 'next/router'
import profile from './profile';
import { useTheme } from 'next-themes';


import { useEffect, useRef } from 'react';



const profile1 =()=>{
  return(
    <div>Hey</div>
  )
}

const Header = () => {
  const router=useRouter();



  
  const [session] = useSession();

  const [showModal, setShowModal] = useState(false);
  const [docs, setDocs] = useState([]);
  const docNameFieldRef = useRef(null);
  
  

 const docsRef = db
    .collection('userDocs')
    .doc(session?.user.email)
    .collection('docs');

  useEffect(() => {
    const unsub = docsRef
    .orderBy('timestamp', 'desc')
    .onSnapshot(querySnapshot => setDocs(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))))

    return unsub
  }, [])
  console.log(session?.user)

  const handleSubmit = (e) => {
    //e.preventDefault();
    const inputValue = docNameFieldRef.current.value;
    const image = null

    if (inputValue) {

      docsRef.add({
        fileName: inputValue,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        image: "https://files.liveworksheets.com/def_files/2020/11/2/1102205029390751/1102205029390751001.jpg"
      })
      .then(() => {
        setShowModal(false);
       // e.target.reset();
      })
      .catch(err => alert(err))

    }
  }

  const ModalComponent = () => (
    <Modal
      open={showModal}
      onClose={() => setShowModal(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className="grid backdrop-blur-sm place-items-center px-20 "
    >
      
      <div className=" flex justify-center flex-col w-full h-3/6  sm:w-3/6 sm:h-48  bg-gray-300 rounded-2xl opacity-100 outline-none px-4">
       
        
          <input ref={docNameFieldRef} type="text" placeholder="Your document name ?" className=" placeholder-gray-500 bg-transparent rounded-md p-2 mb-1 w-full outline-none" />
          <div className="flex space-x-10 justify-center">
            <button className='bg-transparent  text-gray-600 font-semibold  py-2 px-6 border border-gray-500 hover:bg-gray-400 rounded ' onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button
            onClick={handleSubmit}
             className="bg-blue-500 text-white font-semibold hover:text-white py-2 px-6  hover:bg-blue-600 rounded">
              Create
            </button>
          </div>
        
      </div>
    </Modal>
  );
  const{theme,setTheme}= useTheme()
  
  return ( 
    
    
    <header className="p-3  shadow-sm sticky top-0 bg-white z-50">
       <ModalComponent />
      <div className="flex relative ">
      
        <div className="flex items-center col-span-1">
          
          
          <div className='flex  '>
            <div clas> <img className='w-[180px] ml-4   cursor-pointer' onClick={()=> router.push('/')} src='images/logo1-8.png'/></div>
          <div className='' >
          <button 
              onClick={()=>router.push('/')}
              className=' hover:bg-gray-300    rounded-md  px-3 ml-5  h-10   text-center   inline-flex items-center ' >
     
     Home 
  </button>
          </div>
          <div className='group    '>
          <button 
              
              className=' hover:bg-gray-200     rounded-md ml-2 pl-3 pr-2   h-10   text-center   inline-flex items-center ' >
      
     Models
     <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
</svg>
  </button>
  <nav tabindex="0" class=" border-2 bg-white invisible border-gray-200 rounded w-[430px] h-[290px] absolute left-[230px] shadow-lg top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1">
        <div className='grid grid-cols-2'>
          <ul class="py-3">
              
              <li>
                  <div href="#" className='w-[170px]  ml-3 mt-1 '>
                  
                 
                  <img className='rounded-lg' src='/images/etudiant.jpg'></img>
                  </div>
              </li> 
              
              <li>
                
                  <p    class=" flex items-center    absolute left-4 mt-3 font-semibold text-lg ">
                 
                      Student  
                  </p>
              </li>
              <li>
                
                <button onClick={()=>router.push("/cv")}     className="  flex items-center rounded-md hover:bg-gray-200 w-[170px] cursor-pointer   absolute left-4 mt-12 opacity-70 text-sm ">
               
                    CV  
                </button>
            </li> 
            <li>
                
                <button  onClick={()=>router.push("/lettre")}   className="  flex items-center rounded-md hover:bg-gray-200 w-[170px] cursor-pointer   absolute left-4 mt-[75px] opacity-70 text-sm ">
               
                Letter  
                </button>
            </li> 
            <li>
                
                <button  onClick={()=>router.push("/notes")}   className="  flex items-center rounded-md hover:bg-gray-200 w-[170px] cursor-pointer   absolute left-4 mt-[105px] opacity-70 text-sm ">
               
                Notes  
                </button>
            </li>
          </ul>   
          <ul class="py-3">
              
              <li>
                  <div href="#" className='w-[170px]   mt-1 '>
                  
                 
                  <img className='rounded-lg' src='/images/sign.jpg'></img>
                  </div>
              </li> 
              
              <li>
                
                  <p     class=" flex    absolute  mt-3    font-semibold text-lg ">
                 
                      وثائق  
                  </p>
              </li>
              <li>
                
                <button onClick={()=>router.push("/contrat")}      class=" flex items-center hover:bg-gray-200 pr-10 w-[170px] cursor-pointer   absolute  mt-12 opacity-70 text-sm ">
               
                    عقود   
                </button>
            </li> 
            <li>
                
                <button onClick={()=>router.push("/contrat")}       class=" flex items-center hover:bg-gray-200 pr-10 w-[170px] cursor-pointer   absolute  mt-[75px] opacity-70 text-sm ">
               
                    توكيل  
                </button>
            </li> 
            
          </ul>     
                </div>
           
        </nav>
          </div>
          <div className=' '>
          <button 
              onClick={()=>router.push('/help')}
              className=' hover:bg-gray-200  ml-2 px-2  rounded-md pl-3 pr-2    h-10   text-center   inline-flex items-center ' >
    
     Help
  </button>
          </div>
          <button 
          onClick={()=> setTheme(theme === 'light' ?'dark':'light')}
          className='absolute right-[270px] top-1 bg-[#03423E] rounded-full p-2 hover:bg-gray-800 '>
            
            {theme=== 'light'? <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
</svg>:<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
</svg>}
</button>
<button 
          onClick={()=>router.push('/chat')}
          className='absolute right-[330px] top-1 bg-[#03423E] rounded-full p-2 hover:bg-gray-800 '>
            
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
</svg>
</button>

          </div>
          
         
          
           
          
          
        </div>
        
 
        <div className="flex items-center col-span-3 justify-end space-x-1">
          <div className="inline-block md:hidden">
            <IconButton>
             
            </IconButton>

          </div>
         
          
              <button 
              onClick={() => setShowModal(true)}
              className=' text-white bg-gradient-to-br from-[#03423E] right-16 absolute to-[#0FD6C9] hover:bg-gradient-to-bl focus:shadow-lg   rounded-md text-sm px-3 h-11   py-4  text-center shadow-lg  inline-flex items-center ' >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
      Create new document
  </button>

    
      <div className='right-0 absolute'>
      <div class="group relative right-0 ">
        <button className='py-2 ml-5 mr-2' ><img src= {session?.user.image} className=" rounded-full h-[40px] w-[40px] " alt="" /></button>
        <nav tabindex="0" class=" border-2 bg-white invisible border-gray-200 rounded w-[370px] absolute right-4 top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1">
            <ul class="py-3">
                <li>
                    <div href="#" class=" py-1 flex ">
                    <div className='ml-5 flex flex-none'>
                    <img  src={session?.user.image} className="  rounded-full h-[70px] w-[70px] " alt="" />
                    </div>
                   
                    <div className=' font-semibold mt-2 relative text-lg items-center mx-auto'>
                      
                    {session?.user.name}
                    <div className=' font-normal text-sm mt-2 opacity-6 0'>{session?.user.email}</div>
                    </div>
                    </div>
                </li> 
                <div>
                  <hr className='mt-4 mb-3'></hr>
                </div>
                <li>
                  
                    <a  href="/profile"   class=" flex items-center text-sm opacity-90  px-4 py-2 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-3  opacity-70" viewBox="0 0 20 20" fill="currentColor">
  <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
</svg>
                        Account settings  
                    </a>
                </li>
                <li>
                    <a href="/help" class="flex items-center text-sm opacity-90  px-4 py-2 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-3  opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
                        Get help 
                    </a>
                </li>
                <div>
                  <hr className='mt-2 mb-1'></hr>
                </div>
                <li>
                    <a href="#" onClick={signOut} class="flex items-center text-sm opacity-90 px-4 py-3 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-3 mt-1  opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
</svg>
                        Sign out
                    </a>
                </li>
                
            </ul>
        </nav>
    </div>
      </div>
         

          



        </div>
      </div>
    </header>
  
  );
}

export default Header;
