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
import { storage } from '../firebase';
import firebase from 'firebase';
import DocumentRow from '../components/DocumentRow';
import SearchIcon from '@material-ui/icons/Search';
import { signOut } from 'next-auth/client';



const  profile = ({session})=> {
    if(!session) return <Login/>

    const [Name,setName] = useState(session?.user.name);

 /* const user = firebase.auth().currentUser;
    const user1= db
    .collection('users')
    .doc(user.uid)
    .get();*/

   // console.log(user.data()['name']);


   const changeName=()=>{
    db.collection("users").doc('VTtHqESvIlx61GTikuAv').set({
      image: session?.user.image,
      email:session?.user.email,
      name: Name
    }).then(() => {
      console.log("Document successfully written!");
  })
   }





    return (
       
     
    <div>
        <Head>
        <title>Settings - Tunpaper </title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@700&display=swap" rel="stylesheet"></link>
      </Head>

        <Header/>
        <div className='relative w-1/2 mx-auto'>
            <h1 className='font-bold text-lg absolute top-4 '>Your Account</h1>
            <p className='font-semibold text-base absolute top-[80px] '>Profile Photo</p>
            <div className='hover:shadow-md   rounded-full  absolute top-[115px] '>
                    <img  src={session?.user.image} className=" rounded-full h-[80px] w-[80px] " alt="" />
            </div>
           
            
            <hr className='w-[682px] absolute top-[220px] '></hr>
            <p className=' font-semibold text-base absolute top-[245px] '>Name</p>
            <input type='text' onChange={(e)=> setName(e.target.value)} value={Name} className=' font-normal text-sm absolute top-[280px] '/>
            <button onClick={changeName} className='absolute bg-gray-100 hover:bg-gray-200 top-[270px]  w-[75px] h-[40px] rounded-md right-[90px]'><p className='font-semibold text-sm opacity-80'>Save</p></button>
            <hr className='w-[682px] absolute top-[340px] '></hr>
            <p className=' font-semibold text-base absolute top-[365px] '>Email address</p> 
            <p className=' font-normal text-sm absolute top-[400px] '>{session?.user.email}</p> 
            
            <hr className='w-[682px] absolute top-[460px] '></hr>
        </div>
    </div>
  )
}

export default profile

export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    return {
      props: {session}
    }
  }