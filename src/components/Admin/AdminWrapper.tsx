import React, { useEffect } from 'react';
import MyHeader from '../MyHeader';
import Table from '../Table';
import Form from '../Form';
import AdminForm from './AdminForm';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const AdminWrapper = () => {
  let navigate = useNavigate();
  const isAdmin = useTypedSelector(state => state.role).isAdmin

  useEffect(() => {
    if (isAdmin !== true) {
      alert('Доступ запрещен')
      navigate('/')
    }


  }, [])


  return (
    <>
      <MyHeader adminMode />
      <main>
        <Table adminMode />
        <AdminForm />
      </main>
    </>
  )
}

export default AdminWrapper