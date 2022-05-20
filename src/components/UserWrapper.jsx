import MyHeader from './MyHeader';
import Table from './Table';
import Form from './Form';
import ProfileCardWrapper from './ProfileCard/ProfileCardWrapper';

const UserWrapper = () => {


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