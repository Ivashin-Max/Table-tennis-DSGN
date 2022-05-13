import { useEffect } from 'react';
import MyHeader from '../MyHeader';
import Table from '../Table';

import { useNavigate } from 'react-router-dom';

import ProfileCardWrapper from '../ProfileCard/ProfileCardWrapper';
import Form from '../Form';


const EditorWrapper = () => {
  let navigate = useNavigate();
  const isEditor = !!sessionStorage.getItem('editor')

  useEffect(() => {


    if (isEditor !== true) {
      alert('Доступ запрещен')
      navigate('/')
    }
  }, [])


  return (
    <>
      <MyHeader adminMode={false} />
      <main>
        <Table adminMode={true} />
        <Form />
        <ProfileCardWrapper />
      </main>
    </>
  )
}

export default EditorWrapper