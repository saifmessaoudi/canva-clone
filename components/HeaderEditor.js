import React from 'react';
import { Icon, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import DescriptionIcon from '@material-ui/icons/Description';
import SearchIcon from '@material-ui/icons/Search';
import AppsIcon from '@material-ui/icons/Apps';
import { signOut } from 'next-auth/client';
import { useSession } from 'next-auth/client';
import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import Link from 'next/link'
import {showModal,handleSubmit,docNameFieldRef,} from '../pages/index'
import Modal from '@material-ui/core/Modal';
import db from '../firebase';
import firebase from 'firebase';
import { useRouter } from 'next/router'
import Home from '../pages/index';



import { useEffect, useRef } from 'react';





const Header = ({ doc }) => {
  
  const router = useRouter()
  const [session] = useSession();

  const [showModal, setShowModal] = useState(false);
  const [docs, setDocs] = useState([]);
  const docNameFieldRef = useRef(null);
  if (!session) return <Login />

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

  const handleSubmit = (e) => {
    //e.preventDefault();
    const inputValue = docNameFieldRef.current.value;

    if (inputValue) {

      docsRef.add({
        fileName: inputValue,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        setShowModal(false);
        //e.target.reset();
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
  
  return (
    <header className="p-1 shadow-md sticky top-0 bg-gradient-to-r from-[#0dbeb3] to-[#03423E]   z-50">
       <ModalComponent />
      <div className="grid grid-cols-4">
      
        <div className="flex items-center col-span-1">
        <button 
          onClick={() => router.push('/')} 
           className=' text-white bg-transparent font-Noto  font-medium rounded-md text-xl px-5 py-3 hover:bg-opacity-10 hover:bg-white inline-flex items-center ' >
 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
</svg>
  Home
</button>

          <div className="text-[#2196f3] items-center space-x-2 ml-3 hidden md:inline-flex">
            
            
          </div>
        </div>

   

        <div className="flex items-center col-span-3 justify-end space-x-1">
          <div className="inline-block md:hidden">
            <IconButton>
             
            </IconButton>

          </div>
          <p>{doc?.fileName} </p>

          <button 
            
              className='  bg-white hover:bg-gray-200 mr-10 focus:shadow-lg   rounded-md text-sm px-3 h-10   py-4  text-center shadow-lg  inline-flex items-center ' >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
</svg>
      Try collaborative editor 
  </button>
         
          <button >
            <img src={session?.user.image} className=" animate-pulse border-2  mr-4 ml-4 border-white rounded-full h-[45px] w-[45px] " alt="" />
            
          </button>
          
        </div>

      </div>
      <div>
      
      </div>
    </header>
  
  );
}

export default Header;
