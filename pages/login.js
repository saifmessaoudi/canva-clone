import { Provider, providers, useSession ,signIn, getProviders, getCsrfToken } from 'next-auth/client';
import React, { useEffect } from 'react';
import {useRouter} from "next/router";
import { useState } from 'react';
import { getSession } from 'next-auth/client';
import { data } from 'autoprefixer';
import { getAuth, createUserWithEmailAndPassword, signInWithCredential,signInWithEmailAndPassword ,signInWithCustomToken  } from "firebase/auth";
import "firebase/auth";
import firebase from 'firebase'
import Login from '../components/Login';
require('firebase/auth')
import{ }from '../firebase'



const login = () => {
    
    const router = useRouter();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState(""); 
    const [session]=useSession();
    const[providers,setproviders]=useState();
    
    const [errorEmail, setErrorEmail] = useState(null);
    const [error, setError] = useState('');

    const SigninUser=(e)=>{
      e.preventDefault();
      let options={redirect :false,email,password};
      if(!email.toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )){
          setError("Please enter a valid email !")
          setErrorEmail(true);
          
        }
          
       firebase.auth().signInWithEmailAndPassword( email,password)
         .then((userCredential) => {

            // Signed in 
            const res =  signIn("credentials",options);
            router.push("/")
            console.log(email,password);
            // ...
          }).catch((e)=>{
            setError(e.message)
            setErrorEmail(true)
        })
          
     
    }

    

  
    function submit(e){
        e.preventDefault();
        
         firebase.auth().signInWithEmailAndPassword( email,password)
         .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            const user1=firebase.auth().currentUser;
            console.log(user1.uid);
            console.log(user);
            // ...
          })
          .catch(
            (error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
               
              }
            )
            ;
            
      }
         
        
        
        
    
    useEffect(()=>{
        const setTheProviders = async () =>{
            const setupProviders = await getProviders();
            setproviders(setupProviders);
        };
        setTheProviders();
    },[]); 
    
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

         await router.push('/dashboard')
    }*/}

  return (
    <div>
      <div className="flex flex-col  items-center justify-center h-full bg-gradient-to-r from-[#03423E] to-[#0FD6C9] w-full py-16 px-4">
      
        <div className='w-[400px] '>
            <img  src='images/logo-png-8.png'>
            
            </img>
        </div>
        <div className=' absolute left-7 top-[80px]'>
            <button onClick={()=>router.push('/')}><svg xmlns="http://www.w3.org/2000/svg" class="h-11 w-11  animate-pulse relative " fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="3">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
</svg></button>
</div>
        

      <div className="bg-white shadow rounded-2xl lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
                    <p tabindex="0" className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">Login to your account</p>
                    <p tabindex="0" className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">Dont have account? <a href="/Signup"   className=" focus:text-blue-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-gray-800 cursor-pointer hover:text-blue-500"> Sign up here</a></p>
                    <button 
                        onClick={()=>signIn(providers.google.id ,{
                            callbackUrl: `${window.location.origin}/`,
                          })}
                    aria-label="Continue with google" role="button" className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 hover:bg-gray-200 flex items-center w-full mt-10">
                        <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z" fill="#4285F4" />
                            <path d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z" fill="#34A853" />
                            <path d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z" fill="#FBBC05" />
                            <path d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z" fill="#EB4335" />
                        </svg>
                        <p className="text-base font-medium ml-4 text-gray-700">Continue with Google</p>
                    </button>
                    <button 
                     onClick={()=>signIn(providers.facebook.id ,{
                        callbackUrl: `${window.location.origin}/`,
                      })}
                    aria-label="Continue with twitter" role="button" className="focus:outline-none  focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 hover:bg-gray-200 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4">
                                        <svg
                    class="w-6 h-6 text-blue-600 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path
                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    />
                    </svg>
                            
                        <p className="text-base font-medium ml-4 text-gray-700">Continue with Facebook</p>
                    </button>

                    <div className="w-full flex items-center justify-between py-5">
                         <hr className="w-full bg-gray-400"/>
                         <p className="text-base font-medium leading-4 px-2.5 text-gray-400">OR</p>
                         <hr className="w-full bg-gray-400  "/>
                        </div>
                        <div>
                            <label id="email"  className=" text-sm font-medium leading-none text-gray-800">
                                Email
                            </label>
                            <input onChange={(e)=> setEmail(e.target.value)} value={email}  aria-labelledby="email" type="email" className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"/>
                        </div>
                        <div className="mt-2 w-full">
                            <label for="pass" className="text-sm font-medium leading-none text-gray-800">
                                Password
                            </label>
                           <div className="relative flex items-center justify-center">
                            <input onChange={(e)=> setPassword(e.target.value)} value={password}  id="pass" type="password" className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"/>
                            <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                                
                                    
                            </div>
                           </div>
                        </div>
                        <div onClick={(e)=>SigninUser(e)}
                      className="mt-8">
                            <button role="button" className=" focus:ring-indigo-700 text-sm font-semibold leading-none text-white  bg-gradient-to-r from-[#03423E] to-[#0FD6C9] border rounded hover:bg-gradient-to-bl shadow-md py-4 w-full">Sign in</button>
                        </div>
                        
                        <div className={`${!errorEmail ? "hidden" : ""}  text-red-600 font-bold mt-3`}>
         {error}
        </div>
               
    </div>
      </div>
      
    </div>
  );
}

export default login;
export async function getServerSideProps(context) {
    return { props: { providers: await getProviders() } };
  }
