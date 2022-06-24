import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client';
import db from '../../firebase';
import PeopleIcon from '@material-ui/icons/People';
import DescriptionIcon from '@material-ui/icons/Description';
import TextEditor from '../../components/TextEditor';
import { Button } from '@material-ui/core';
import Loader from "react-loader-spinner";

const Doc = ({ session }) => {
  const router = useRouter();
  const { id } = router.query; 
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    if (!session) return;
    
    db
      .collection('userDocs')
      .doc(session?.user.email)
      .collection('docs')
      .doc(id)
      .get()
      .then(data => {
        if (data.data()) {
          setDoc({ ...data.data() })
        } else {
          router.replace('/')
        }
      })
      .catch(err => aler(err))

  }, [id, session]);

  return (
    <div>
      

      {doc && <TextEditor doc={doc} />}
    </div>
  );
}

export default Doc;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {session}
  }
}