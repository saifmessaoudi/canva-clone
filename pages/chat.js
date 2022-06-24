import React from 'react'
import Head from 'next/head'
import {useEffect, useState} from "react";
import Pusher from "pusher-js";
import { getSession } from 'next-auth/client';
import Login from '../components/Login';
import { useRouter } from 'next/router';


export default function chat({session}) {


    if(!session) return <Login/>
    const [username, setUsername] = useState(session?.user.name);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const router=useRouter();
    let allMessages = [];

    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher('54db64e117016c1e6d89', {
            cluster: 'mt1'
        });

        const channel = pusher.subscribe('chat');
        channel.bind('message', function (data) {
            allMessages.push(data);
            setMessages(allMessages);
        });
    });

    const submit = async (e) => {
        e.preventDefault();

        await fetch('http://localhost:8000/api/messages', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
                message
            })
        });

        setMessage('');
    }

    return (
        <div className="md:container md:mx-auto">
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
                      crossOrigin="anonymous"/>
            </Head>

            <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
            <div class="relative flex items-center p-3 border-b border-gray-300">
            <svg onClick={()=>router.push('/')} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-5 hoover hover:bg-gray-100 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
</svg>
              <img class="object-cover w-11 h-11 rounded-full"
                src={session?.user.image} alt="username" />
                <span class="absolute w-3 h-3 animate-pulse bg-green-600 rounded-full left-[90px] top-3">
              </span>
              <input className="fs-5 fw-semibold mx-4" value={session?.user.name} onChange={e => setUsername(e.target.value)}/>
              
            </div>

            <div class="relative w-full p-6 overflow-y-auto h-[550px]">

              <ul class="space-y-2 flex">
                <li class="flex justify-start">
                  <div class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                    <span class="block">{messages.map(message => {
                        return (
                            <div className="">
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                    <strong className="mb-1">{message.username}</strong>
                                </div>
                                <div className="col-10 mb-1 small">{message.message}</div>
                            </div>
                        )
                    })}</span>
                  </div>
                </li>
                
               
                
              </ul>

            </div>






                
                
            </div>
<div className='mx-auto py-2 flex w-full pl-2'>
<form onSubmit={submit}>
                <input type="text" placeholder="Message"
                class="block w-[1000px] py-2 pl-2 mx-auto bg-gray-100 rounded-full outline-none focus:text-gray-700 " required value={message}
                       onChange={e => setMessage(e.target.value)}
                />
                </form>
              <button  type="submit" onSubmit={submit}>
                <svg class="w-5 h-5 mx-auto text-gray-500 ml-4  origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
</div>
            
            
              
           
          </div>

    
        
    )
}

export async function getServerSideProps(context){
    const session = await getSession(context);
    return {
        props : {session}
    }
}