import Head from 'next/head'
import Header from '../components/Header';
import { useEffect, useState, useRef } from 'react';
import Login from '../components/Login';
import { getSession } from 'next-auth/client';
import { Button, IconButton } from '@material-ui/core';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import Image from 'next/image';
import db from '../firebase';
import firebase from 'firebase';
import DocumentRow from '../components/DocumentRow';
import SearchIcon from '@material-ui/icons/Search';
import { signOut } from 'next-auth/client';
import router, { useRouter } from 'next/router';



const  help = ({session})=> {
   
  

    const docsRef = db
    .collection('feed')

   

   

    const nameref = useRef(null);
    const messageref = useRef(null);
    const router = useRouter();

    

   
    if(!session) return <Login/>

    function Send (){
       const name=nameref.current.value;
       const msg=messageref.current.value;

        db.collection('feed').add({
            Email: session.user.email,
            Name: name,
            Message: msg,
            Date :firebase.firestore.FieldValue.serverTimestamp(), 
          });

          router.push('/');
    }

    return (
        
    <div>
        <Head>
        <title>Get help - Tunpaper </title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@700&display=swap" rel="stylesheet"></link>
      </Head>

        <Header/>
        
      
<div class="w-full mt-10 mx-auto max-w-lg">
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        First Name
      </label>
      <input ref={nameref} class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Your name"/>
      
    </div>
    
  </div>
  
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label  class="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Message
      </label>
      <textarea ref={messageref} class=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none" id="message"></textarea>
      
    </div>
  </div>
  <div class="md:flex md:items-center">
    <div  class="md:w-1/3">
    <button 
              onClick={Send}
              className=' text-white bg-gradient-to-br from-[#03423E]  absolute to-[#0FD6C9] hover:bg-gradient-to-bl focus:shadow-lg   rounded-md text-sm px-3 h-11   py-4  text-center shadow-lg  inline-flex items-center ' >
      
      Send your feed
  </button>
    </div>
    <div class="md:w-2/3"></div>
  </div>    
    </div>
    </div>
  )
}

export default help

export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    return {
      props: {session}
    }
  }