import { useEffect } from 'react';
import MyHeader from '../MyHeader';
import Table from '../Table';
// import AdminForm from './AdminForm';
import { useNavigate } from 'react-router-dom';

import ProfileCardWrapper from '../ProfileCard/ProfileCardWrapper';
import ResetPassForm from './Authorization/ResetPassForm';


const ResetPass = () => {





  return (
    <>
      <div className="center">
        <ResetPassForm sendEmail={false} closeFormModal={() => null} changeForm={() => null} />
      </div>
    </>
  )
}

export default ResetPass