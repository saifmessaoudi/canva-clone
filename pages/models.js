import React from 'react';
import { useEffect, useState, useRef } from 'react';
import db from '../firebase';
import ModelRow from '../components/ModelRow';
import DocumentRow from '../components/DocumentRow';
import AdminDoc from '../components/AdminDoc';
import Modal from '@material-ui/core/Modal';
import{collection }from '../firebase'
import DocRow from '../components/DocRow';
import AdminRow from '../components/AdminRow';



function models({ doc }) {

    const [cvModels, setCVModels] = useState([]);
    const [LettreModels, setLettreModels] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [ContratModels, setContratModels] = useState([]);
    const docNameFieldRef = useRef(null);
    const [ProfessionnelModels, setProfessionnelModels] = useState([]);
   

    const catref = db.collection('Docs');

    const [categorie , setCategorie] = useState([]);
    


    const ProfessionnelModelsRef=db
   .collection('Docs')
   .doc('Business')
   .collection('Doc');
 
   useEffect(()=> { 
     const unsub = ProfessionnelModelsRef
     .orderBy('timestamp', 'desc')
     .onSnapshot(querySnapshot => setProfessionnelModels(querySnapshot.docs.map(professionnel => ({id : professionnel.id,name:"Business" ,...professionnel.data()}))))
   return unsub
 
   },[])
      //Contrattunisie
  const ContratModelsRef=db
  .collection('Docs')
  .doc('Papiertunisie')
  .collection('Doc');

  useEffect(()=> { 
    const unsub = ContratModelsRef
    .orderBy('timestamp', 'desc')
    .onSnapshot(querySnapshot => setContratModels(querySnapshot.docs.map(contrat => ({id : contrat.id, name:"Papiertunisie", ...contrat.data()}))))
  return unsub

  },[])

    //CV MODEL
    const CVmodelsRef=db
    .collection('Docs')
    .doc('CV')
    .collection('Doc');
  
    useEffect(()=> { 
      const unsub = CVmodelsRef
      .orderBy('timestamp', 'desc')
      .onSnapshot(querySnapshot => setCVModels(querySnapshot.docs.map(cv => ({id : cv.id, name:'CV' , ...cv.data()}))))
    return unsub
  
    },[])
    
    //Lettre MODEL
    const LettreModelsRef=db
    .collection('Docs')
    .doc('Lettre')
    .collection('Doc');
  
    useEffect(()=> { 
      const unsub = LettreModelsRef
      .orderBy('timestamp', 'desc')
      .onSnapshot(querySnapshot => setLettreModels(querySnapshot.docs.map(cv => ({id : cv.id, name:'Lettre' , ...cv.data()}))))
    return unsub
  
    },[])
    
      
    catref.get().then((snapshot)=>{
            snapshot.docs.forEach(doc=>{
              categorie.push(doc.id)
             
                
            }) 
        })

       
    const docsRef = db
    .collection('Docs')
    

      const handleSubmit = (e) => {
        //e.preventDefault();
        const inputValue = docNameFieldRef.current.value;
      
    
        if (inputValue) {
    
          docsRef.doc(inputValue,).set({
           
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
           
            
              <input ref={docNameFieldRef} type="text" placeholder="Add new Categorie" className=" placeholder-gray-500 bg-transparent rounded-md p-2 mb-1 w-full outline-none" />
              <div className="flex space-x-10 justify-center">
                <button className='bg-transparent  text-gray-600 font-semibold  py-2 px-6 border border-gray-500 hover:bg-gray-400 rounded ' onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button
                onClick={handleSubmit}
                 className="bg-blue-500 text-white font-semibold hover:text-white py-2 px-6  hover:bg-blue-600 rounded">
                  Add
                </button>
              </div>

            
          </div>
        </Modal>
      );


  return (
     
    <div>
         <ModalComponent/>
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
        <h3 class="text-gray-400">Hi, Saif</h3>
        
        <div class="ml-3  relative">
          <div class="py-3">
            <button type="button" class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span class="sr-only">Open user menu</span>
              <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            </button>
          </div>

          
          
        </div>
      </div>
    </div>
  </div>
</nav>


<div class=" md:flex md:flex-shrink-0 ">
  <div class="flex flex-col w-64">
    
    <div class="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
      <div class="mt-5 flex-grow flex flex-col">
        <div class="flex-1 px-2 bg-white space-y-1">
          
          <a href="/dashboard" class=" text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
           

              
            <svg class="text-gray-500 mr-3 flex-shrink-0 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </a>

          <a href="/categories" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
            
          <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
</svg>
            Categorie
          </a>

          <a href="/documents" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
            
            
            <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
</svg>
            Add document
          </a>
          <a href="/documents" class="text-gray-600 hover:bg-gray-50 bg-gray-100 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
            
            
          <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
</svg>
            Models
          </a>

        

          

        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col w-0 flex-1 overflow-hidden">
    <div class="flex  flex-shrink-0 ">

      <div class="flex flex-col w-0 flex-1 ">
        <div class="flex-1 relative flex-shrink-0 overflow-y-auto focus:outline-none">
          <div class="py-6">
             

            <div class=" mx-auto px-4 sm:px-6 md:px-8">
              <h1 class="text-2xl font-semibold text-gray-900">Template Gallery</h1>
              <div class="flex justify-center">
  <div class="mb-3 xl:w-96">
    <div class="input-group relative flex flex-wrap items-stretch w-full mb-4">
      
    </div>
  </div>
</div>
              <div  className="grid mt-10 pb-5 grid-cols-5 gap-x-[30px]   ">
      
      {cvModels?.map(doc => (
            <AdminRow
              id="CV"
              key={doc.id}
              doc={doc}
              
            />
           
      ))}</div>
      <div  className="grid mt-10 pb-5 pt-1 grid-cols-5 gap-x-[30px]   ">
      
      {LettreModels?.map(doc => (
            <AdminRow
              id="Lettre"
              key={doc.id}
              doc={doc}
              
            />
           
      ))}</div>
       <div  className="grid mt-10 pb-5 pt-1 grid-cols-5 gap-x-[30px]   ">
      {ContratModels?.map(doc => (
           <AdminRow
           id="Papiertunisie"
             key={doc.id}
             doc={doc}
             
           />
           
          
     ))}</div>
      <div  className="grid mt-10 pb-5 pt-1 grid-cols-5 gap-x-[30px]   ">
      {ProfessionnelModels?.map(doc => (
           <AdminRow
           id="Business"
             key={doc.id}
             doc={doc}
             
           />
           
          
     ))}</div>
            
            
                <div class="py-6">
                  <div class="px-4 sm:px-6 md:px-0">
                   
                    <div class="px-4 sm:px-6 md:px-0">
                      <div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                        <div class="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                          <div class="w-full">
                           
                            <div class="relative">
                             
                             
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
    </div>
  </div>
</div>

  )
}

export default models