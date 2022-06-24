
import React ,{SyntheticEvent, useState} from 'react';
import { useRouter } from 'next/router';
import { getSession,providers} from 'next-auth/client';
import {signIn} from 'next-auth/client'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import{ }from '../firebase'
import firebase from 'firebase'
import db from '../firebase';

const Signup = ({session , providers}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState(null);
    const [error, setError] = useState('');

    const router = useRouter(); 
    console.log({session,providers});

    const submit = async (e) => {
        e.preventDefault();
        
        if (password==ConfirmPassword ){
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
              // Signed in 
                
             console.log(userCredential);
  
  
              console.log(firebase.auth().currentUser.uid);
                db.collection("users").doc(firebase.auth().currentUser.uid).set({
                  name: email,
                  email: email,
                  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"
              })
              
              router.push('/login')
              // ...
            })
            .catch((e)=>{
                console.log(e.message)
                setError(e.message)
                setErrorEmail(true);
                
            }
              );
        }else {
            setError("Passwords do not match ! ")
            setErrorEmail(true);
    }
        
    }

  return (
    <div>
<div   className="flex flex-col  items-center justify-center h-[760px] bg-gradient-to-r from-[#03423E] to-[#0FD6C9] w-full py-16 px-4">

<div className='w-[400px] '>
    <img  src='images/logo-png-8.png'>
    
    </img>
</div>
<div className=' absolute left-7 top-[80px]'>
            <button onClick={signIn}><svg xmlns="http://www.w3.org/2000/svg" class="h-11 w-11  animate-pulse relative " fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="3">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
</svg></button>
</div>

<div className="bg-white shadow rounded-2xl lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
            <p tabindex="0" className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">Create your account here</p>
           
           

            <div className="w-full flex items-center justify-between py-5">
                 <hr className="w-full bg-gray-400"/>
                 
                 <hr className="w-full bg-gray-400  "/>
                </div>

                <div>
                    <label id="username"  className=" text-sm font-medium leading-none text-gray-800" placeholder='Username'>
                        Name
                    </label>
                    <input onChange={e => setName(e.target.value) } aria-labelledby="email" type="email" className="appearance-none border-2 rounded w-full py-2 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-green-600 focus:bg-white text-gray-700 pr-16 "/>
                </div>

               
                <div>
                    <label id="email"  className=" text-sm font-medium leading-none text-gray-800">
                        Email
                    </label>
                    <input onChange={e => setEmail(e.target.value)} aria-labelledby="email" type="email" className="appearance-none border-2 rounded w-full py-2 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-green-600 focus:bg-white text-gray-700 pr-16"/>
                </div>
                <div className="mt-1  w-full">
                    <label for="pass" className="text-sm font-medium leading-none text-gray-800">
                        Password
                    </label>
                   <div className="relative flex items-center justify-center">
                    <input onChange={e => setPassword(e.target.value)} id="pass" type="password" className="appearance-none border-2 rounded w-full py-2 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-green-600 focus:bg-white text-gray-700 pr-16"/>
                    <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                        
                            
                    </div>
                   </div>
                </div>
                <div className="mt-2  w-full">
                    <label for="pass" className="text-sm font-medium leading-none text-gray-800">
                        Confirm Password
                    </label>
                   <div className="relative flex items-center justify-center">
                    <input onChange={e => setConfirmPassword(e.target.value)} id="pass" type="password" className="appearance-none border-2 rounded w-full py-2 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-green-600 focus:bg-white text-gray-700 pr-16"/>
                    <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                       
                            
                    </div>
                   </div>
                </div>

                <div className="mt-8">
                    <button
                    onClick={submit}
                    role="button" className=" focus:ring-indigo-700 text-md font-semibold leading-none text-white  bg-gradient-to-r from-[#03423E] to-[#0FD6C9] rounded-md hover:bg-gradient-to-bl shadow-lg py-4 w-full">Create your new account</button>
                </div>

                <div className={`${!errorEmail ? "hidden" : ""}  text-red-600 font-bold mt-3`}>
         {error}
        </div>
       
</div>
</div>
   
    </div>
  )
}

export default Signup

Signup.getInitialProps= async (context) =>{
    return{
        providers : await providers(context),
        session : await getSession(context)
    }
}