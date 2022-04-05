import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BasicTabs from './ModalTabs';
import AuthForm from '../Authorization/AuthForm';
import RegistrationForm from '../Authorization/RegistrationForm';
import { useState } from 'react';


export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const [register, setRegister] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          {!register && <AuthForm onClick={() => setRegister(prev => !prev)} />}
          {register && <RegistrationForm onClick={() => setRegister(prev => !prev)} />}
          {/* <AuthForm /> */}
          {/* <Auth /> */}
          {/* <BasicTabs /> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}