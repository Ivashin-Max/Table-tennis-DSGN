import React from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import ProfileCardAuth from './ProfileCardAuth';
import ProfileCardNoAuth from './ProfileCardNoAuth';

const SProfileCardWrapper = styled.section`
  width: 264px;
  height:fit-content;
  margin-top: 95px;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
  position:relative;
  z-index:1001;
  background-color: #fff;
`

const ProfileCardWrapper = () => {
  const isAuthorized = useTypedSelector(state => state.auth.isAuthorized);



  return (
    <SProfileCardWrapper>
      {isAuthorized && <ProfileCardAuth />}
      {!isAuthorized && <ProfileCardNoAuth />}
    </SProfileCardWrapper>
  )
}

export default ProfileCardWrapper