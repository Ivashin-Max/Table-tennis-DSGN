import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import AuthForm from '../Authorization/AuthForm';
import RegistrationForm from '../Authorization/RegistrationForm';
import { useState } from 'react';


export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const [register, setRegister] = useState(false);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const changeForm = () => {
    setRegister(prev => !prev)
  };



  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Авторизация
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
    </div>
  );
}