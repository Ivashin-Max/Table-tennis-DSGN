import React from 'react'
import MyHeader from './MyHeader';
import Table from './Table';
import Form from './Form';

const UserWrapper = () => {
  return (
    <>
      <MyHeader />
      <main>
        <Table />
        <Form />
      </main>
    </>
  )
}

export default UserWrapper