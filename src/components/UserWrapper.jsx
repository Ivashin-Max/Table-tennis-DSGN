import MyHeader from './MyHeader';
import Table from './Table';
import Form from './Form';
import ProfileCardWrapper from './ProfileCard/ProfileCardWrapper';
import { useLocation } from 'react-router-dom';
import { useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTable, setCalendarMode } from '../store/reducer';
import { getParticipants } from '../actions/fetchDB';


const UserWrapper = () => {

  const location = useLocation();
  const dispatch = useDispatch();


  return (
    <>
      <MyHeader />
      <main>
        <Table />
        <Form />
        <ProfileCardWrapper />
      </main>
    </>
  )
}

export default UserWrapper