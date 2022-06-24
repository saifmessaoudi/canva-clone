import { Provider, providers, signIn, useSession , } from 'next-auth/client';
import React from 'react';
import {useRouter} from "next/router";
import { useState } from 'react';
import { getSession } from 'next-auth/client';
import { data } from 'autoprefixer';
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword  } from "firebase/auth";
import "firebase/auth";
import firebase from 'firebase'
import Footer from './Footer';
require('firebase/auth')






const Login = () => {
    
    const router = useRouter();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState(""); 
    
    

    {/*const submit = async (e) => {
        e.preventDefault();

        await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });

         await router.push('/')
    }*/}


    
    return (
      <div>
        <div className="flex select-none  flex-col items-center justify-center h-full bg-gradient-to-br from-[#03423E] to-[#17e6d8]  w-full py-16 px-4">
      
      
        <div class="w-full container mx-auto">
          <div class="w-full flex items-center ml-2 ">
          
          <div className='w-[400px] ml-7  '>
              <img  src='images/logo-png-8.png'>
              
              </img>
          </div>
          <div class="flex w-[950px]  justify-end content-center">
            <a class="inline-block text-white no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out" href="https://twitter.com/intent/tweet?url=#">
              <svg class="fill-current h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path
                  d="M30.063 7.313c-.813 1.125-1.75 2.125-2.875 2.938v.75c0 1.563-.188 3.125-.688 4.625a15.088 15.088 0 0 1-2.063 4.438c-.875 1.438-2 2.688-3.25 3.813a15.015 15.015 0 0 1-4.625 2.563c-1.813.688-3.75 1-5.75 1-3.25 0-6.188-.875-8.875-2.625.438.063.875.125 1.375.125 2.688 0 5.063-.875 7.188-2.5-1.25 0-2.375-.375-3.375-1.125s-1.688-1.688-2.063-2.875c.438.063.813.125 1.125.125.5 0 1-.063 1.5-.25-1.313-.25-2.438-.938-3.313-1.938a5.673 5.673 0 0 1-1.313-3.688v-.063c.813.438 1.688.688 2.625.688a5.228 5.228 0 0 1-1.875-2c-.5-.875-.688-1.813-.688-2.75 0-1.063.25-2.063.75-2.938 1.438 1.75 3.188 3.188 5.25 4.25s4.313 1.688 6.688 1.813a5.579 5.579 0 0 1 1.5-5.438c1.125-1.125 2.5-1.688 4.125-1.688s3.063.625 4.188 1.813a11.48 11.48 0 0 0 3.688-1.375c-.438 1.375-1.313 2.438-2.563 3.188 1.125-.125 2.188-.438 3.313-.875z"
                ></path>
              </svg>
            </a>
            <a
              class="inline-block text-white no-underline hover:text-blue-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
              href="https://www.facebook.com/sharer/sharer.php?u=#"
            >
              <svg class="fill-current h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M19 6h5V0h-5c-3.86 0-7 3.14-7 7v3H8v6h4v16h6V16h5l1-6h-6V7c0-.542.458-1 1-1z"></path>
              </svg>
            </a>
          </div>
  
           
          </div>
        </div>
  
        
        <div class="container select-none pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
         
          <div class="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
            <h1 class="my-4 text-3xl md:text-5xl text-white  font-bold leading-tight text-center md:text-left">
              
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#94fff8] mr-3">
                Tunpaper, 
              </span>
              
the document within everyone's reach.
            </h1>
            <p class="leading-normal text-bg:white text-white text-base md:text-2xl mb-8 text-center md:text-left">
            Find , create and collaborate in few steps
            </p>
  
           
              <div class="mb-4">
               
              </div>
  
              <div class="flex items-center justify-between w-full  rounded-lg px-8 pt-6 pb-8 mb-4">
                <button
                onClick={signIn}
                  class=" text-lg font-semibold leading-none animate-bounce   bg-white rounded-lg hover:bg-gray-50 shadow-lg  py-4 w-full"
                  type="button"
                >
                  <span class="bg-clip-text text-transparent text-2xl bg-gradient-to-r from-[#03423E] to-[#0FD6C9] ">
                Take a tour 
              </span> 
              
                </button>
              </div>
             
          
            
          </div>
  
         
          <div class="w-full xl:w-3/5 p-10">
            <img class=" shadow-lg mx-auto w-full md:w-4/5 transform -rotate-6 transition select-none hover:scale-110 duration-700 ease-in-out hover:rotate-6"  src='images/editor.png' />
          </div>
  
          
        </div>
      </div>
  
      <div>
      <div class="mx-auto md:pt-16 flex flex-col items-center justify-center">
            <p class=" text-gray-500 text-lg font-bold pb-8 lg:pb-6 text-center">
              You can find us soon on :
            </p>
            <div class="flex w-full justify-center fade-in ">
              <img src="images/apple.png " class="h-12 pr-12 transform hover:scale-125 duration-300 ease-in-out" />
              <img src="images/play.png" class="h-12 transform hover:scale-125 duration-300 ease-in-out" />
            </div>
          </div>
  
          
          
          <section class="bg-white border-b py-8">
        
      </section>
      
      </div>
      <Footer></Footer>
    </div>
        
    
    )
}

export default Login;
