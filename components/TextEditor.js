import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import db from '../firebase';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import SearchIcon from '@material-ui/icons/Search';
import { Button, IconButton } from '@material-ui/core';
import Header from '../components/HeaderEditor';
import Login from '../components/Login';
import ModeRow from './ModeRow';
import { getSession } from 'next-auth/client';


import DocRow from './DocRow';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(module => module.Editor), {
  ssr: false,
})




const TextEditor = ({ doc }) => {
  const [cvModels, setCVModels] = useState([]);
  const [LettreModels, setLettreModels] = useState([]);
  const [ContratModels, setContratModels] = useState([]);
  const [session] = useSession();
  const [docs, setDocs] = useState([]);
  const docsRef = db
  .collection('userDocs')
  .doc(session?.user.email)
  .collection('docs');

  

  //CV
  const CVmodelsRef=db
  .collection('Docs')
  .doc('CV')
  .collection('Doc');

  useEffect(()=> { 
    const unsub = CVmodelsRef
    .orderBy('timestamp', 'desc')
    .onSnapshot(querySnapshot => setCVModels(querySnapshot.docs.map(cv => ({id : cv.id, ...cv.data()}))))
  return unsub

  },[])

  //Lettre
  const LettreModelsRef=db
  .collection('Docs')
  .doc('Lettre')
  .collection('Doc');

  useEffect(()=> { 
    const unsub = LettreModelsRef
    .orderBy('timestamp', 'desc')
    .onSnapshot(querySnapshot => setLettreModels(querySnapshot.docs.map(lettre => ({id : lettre.id, ...lettre.data()}))))
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
    .onSnapshot(querySnapshot => setContratModels(querySnapshot.docs.map(contrat => ({id : contrat.id, ...contrat.data()}))))
  return unsub

  },[])
  
  useEffect(() => {
  const unsub = docsRef
  .orderBy('timestamp', 'desc')
  .onSnapshot(querySnapshot => setDocs(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))))
  
  return unsub
  }, [])

  
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const router = useRouter();
  const { id } = router.query;

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    db.collection('userDocs').doc(session?.user.email).collection('docs').doc(id).set({
      editorState: convertToRaw(editorState.getCurrentContent())
    }, {
      merge: true
    })
  }

  useEffect(() => {
    if (doc?.editorState) {
      setEditorState(EditorState.createWithContent(convertFromRaw(doc?.editorState)))
    }
  }, [doc]);

  return (
    
   
    <div>
      <Header/>
      <div className='flex justify-between   '>
      <div>

      <div className={ 'sidebar flex justify-center bottom-0 lg:left-0 pb-[600px] w-[380px] bg-gray-700  text-center'}>
        <div className='text-gray-800 text-xl'>

        <div className="bg-gray-100 text-sm mt-5 rounded-lg hidden md:inline-flex w-[250px] items-center  text-gray-500 focus-within:text-gray-600 focus-within:shadow-lg focus-within:placeholder-current ">
            
            
          </div>
          <div className='text-white mt-2 mb-2'>Your Documents</div>

        <div className="grid w-[260px]  pb-5 pl-[2px]  pt-[15px] grid-cols-2 gap-x-[60px] gap-4   ">
      {docs?.map(doc => (
            <DocRow
              key={doc.id}
              doc={doc}
            />
          ))}

      </div>
      <div className='text-white mt-5'>Template Gallery</div>
      <div className="grid w-[260px]  pb-5 pl-[2px]  pt-[15px] grid-cols-2 gap-x-[60px] gap-4   ">
        {cvModels?.map(doc => (
            <ModeRow
              key={doc.id}
              doc={doc}
              
            />
           
      ))}</div>
      
 <div className="grid w-[260px]  pb-5 pl-[2px]  pt-[20px] grid-cols-2 gap-x-[60px] gap-4   ">

 {LettreModels?.map(doc => (
            <ModeRow
              key={doc.id}
              doc={doc}
              
            />
           
      ))}
 </div>

 <div className="grid w-[260px]  pb-5 pl-[2px]  pt-[20px] grid-cols-2 gap-x-[60px] gap-4   ">

{ContratModels?.map(doc => (
           <ModeRow
             key={doc.id}
             doc={doc}
             
           />
          
     ))}
</div>

         

        </div>

  </div>

    </div>
    <div className='bg-gray-200 sticky ' >
    <Editor
      editorState={editorState}
      toolbarClassName="  top-5 z-50  mx-auto "
      editorClassName="bg-white shadow-lg max-w-5xl mx-auto border p-10 min-h-screen my-6"
      onEditorStateChange={onEditorStateChange}
    />
    </div>


    </div>

      </div>
      
  );
}

export default TextEditor;
