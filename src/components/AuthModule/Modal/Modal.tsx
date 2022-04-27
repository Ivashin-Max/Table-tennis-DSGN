import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import AuthForm from '../Authorization/AuthForm';
import RegistrationForm from '../Authorization/RegistrationForm';
import { useState } from 'react';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { AuthModalProps } from '../../../types/props';
import { getUser, removeStorageItem } from '../../../actions/localStorage';
import { useEffect } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../../store/reducer';

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const [register, setRegister] = useState(false);
  const isAuthorized = useTypedSelector(state => state.auth.isAuthorized)
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setRegister(false)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };
  const changeForm = () => {
    setRegister(prev => !prev)
  };

  const handleClickExit = () => {
    removeStorageItem('user');
    sessionStorage.clear();
    dispatch(setAuth({ isAuthorized: false }))

    window.location.reload();
  };

  useEffect(() => {
    setRegister(false)

    return () => {
      setRegister(false)
    }
  }, [])



  return (
    <div className='header__button'>
      {!isAuthorized &&
        <>
          <Button variant="contained" onClick={handleClickOpen}>
            Вход
            <AssignmentIndIcon />
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
          >

            <DialogContent>
              {!register && <AuthForm closeFormModal={handleClose} changeForm={changeForm} />}
              {register && <RegistrationForm closeFormModal={handleClose} changeForm={changeForm} />}
            </DialogContent>
          </Dialog>
        </>}
      {isAuthorized &&
        <>
          <Button variant="contained" className='header__button_grey' onClick={handleClickExit}>
            Выход

            <AssignmentIndIcon />
          </Button>
        </>}
    </div>
  );
}