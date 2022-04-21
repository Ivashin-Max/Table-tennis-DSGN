import React, { useEffect } from 'react'
import MyHeader from './MyHeader';
import Table from './Table';
import Form from './Form';
import ProfileCardWrapper from './ProfileCard/ProfileCardWrapper';
import MyCalendar from './Calendar/Calendar';
import { useCurrentTournament } from '../hooks/useCurrentTournament';
const UserWrapper = () => {
  const currentTournament = useCurrentTournament();
  useEffect(() => {

    console.log('currentTournament', currentTournament)
  }, [currentTournament])

  return (
    <>
      <MyHeader />
      <main>
        <Table />
        {
          currentTournament && <Form />
        }
        {!currentTournament && <MyCalendar />}




        {/* <MyCalendar /> */}

        <ProfileCardWrapper />
      </main>
    </>
  )
}

export default UserWrapper