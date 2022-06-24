import React from 'react'
import db from '../firebase'
import { useEffect ,useState} from 'react'

function admin_panel() {

    const [User, setUser] = useState([]);
    const[feed,setFeed]=useState([]);

    const Users = db
    .collection('users');

    const feeds=db.collection('feed')

    useEffect(()=> { 
        const unsub = Users
        
        .onSnapshot(querySnapshot => setUser(querySnapshot.docs.map(professionnel => ({id : professionnel.id, ...professionnel.data()}))))
      return unsub
    
      },[])

      useEffect(()=> { 
        const unsub = feeds
        
        .onSnapshot(querySnapshot => setFeed(querySnapshot.docs.map(professionnel => ({id : professionnel.id, ...professionnel.data()}))))
      return unsub
    
      },[])

      const deleteuser = async (doc,id)=>{
        const del=db.collection('users').doc(doc.id);
        await del.delete();
    }

    const deletefeed = async (doc)=>{
      const del = db.collection('feed').doc(doc.id);
      await del.delete();
    }

    

  return (
    <div>
         
<nav class="bg-white shadow">
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div class="relative flex justify-between h-16">
      <div class="absolute  inset-y-0 left-0 flex items-center sm:hidden">
        
        <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-controls="mobile-menu" aria-expanded="false">
         <span class="sr-only">Open main menu</span> 
         
       
        </button> 
      </div>
      <div class="flex-1 flex items-center justify-start sm:items-stretch">
        <div class="flex-shrink-0 flex items-center">
          <img class="lg:block h-8 w-auto" src='images/logo1-8.png' alt="Workflow" />
        </div>
        <div class="sm:ml-6 sm:flex sm:space-x-8"></div>
      </div>
      <div class="absolute z-10 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <h3 class="text-gray-400">Hi, Admin</h3>
        
        <div class="ml-3  relative">
          <div class="py-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="gray">
  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
</svg>
          </div>

          
          
        </div>
      </div>
    </div>
  </div>
</nav>


<div class=" md:flex md:flex-shrink-0 ">
  <div class="flex flex-col">
    
    
  </div>
  <div class="flex flex-col w-0 flex-1 overflow-hidden">
    <div class="flex  flex-shrink-0 ">

      <div class="flex flex-col w-0 flex-1 overflow-hidden">
        <div class="flex-1 relative flex-shrink-0 overflow-y-auto focus:outline-none">
          <div class="py-6">
             

            <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 class="text-2xl font-semibold text-gray-900">Admin panel</h1>
            <h1 className=' text-lg mt-5'>Active users</h1>
              
              
              <div class="flex flex-col">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div class="overflow-hidden">
          
        <table class="min-w-full mt-5">
          <thead class=" bg-gray-200 border-b">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Image
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-4 py-4 text-left">
                Name
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-4 py-4 text-left">
                Email
              </th>
              
            </tr>
          </thead>
          <tbody>
          {User?.map(doc=>(
                 <tr class="bg-white border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100">
                     <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"><img className='h-10 w-10 rounded-full' src={doc.image}></img></td>
                     <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {doc.name}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {doc.email}
              </td> 
              <td class="text-sm text-gray-900  font-light px-6 py-4 whitespace-nowrap">
              <svg onClick={()=>{deleteuser(doc)}} xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 rounded-lg hover:bg-red-400" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>
              </td> 
                 </tr>
              ))}
           
        
          </tbody>
        </table>
        <h1 className=' text-lg mt-5 mb-5'>Current Feeds</h1>
        
        {feed?.map(doc=>(
         <div onClick={()=>{deletefeed(doc)}}  class=" bg-white flex rounded-lg border cursor-pointer hover:bg-red-500   border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    
    <p class="mb-2 mt-2 ml-5 text-md font-light tracking-tight text-gray-900 cursor-pointer  dark:text-white">{doc.Name}</p>
         <p class="mb-2 mt-2 ml-5 text-md font-bold tracking-tight cursor-pointer text-gray-900 dark:text-white">{doc.Email}</p>
         <p className="mb-2 mt-2 ml-5 text-md font-light tracking-tight text-gray-900 cursor-pointer  dark:text-white">Message: </p>
         <p class="mb-2 mt-2 ml-5 text-md font-light tracking-tight text-gray-900 cursor-pointer dark:text-white">{doc.Message}</p>
        
 </div>
         
        ))}
       
      </div>
    </div>
  </div>
</div>
            
              
             
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default admin_panel