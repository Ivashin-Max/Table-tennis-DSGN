import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import AuthForm from '../Authorization/AuthForm';
import RegistrationForm from '../Authorization/RegistrationForm';
import { useState } from 'react';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { removeStorageItem } from '../../../actions/localStorage';
import { useEffect } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../../store/reducer';
import { ModalSteps } from '../../../types/forms';
import ResetPassSendEmail from '../Authorization/ResetPassSendEmail';

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const [modalStep, setModalStep] = useState<ModalSteps>('auth');
  const isAuthorized = useTypedSelector(state => state.auth.isAuthorized)
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setModalStep('auth')
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeForm = (step: ModalSteps) => () => {
    setModalStep(step)
  };

  const handleClickExit = () => {
    removeStorageItem('user');
    sessionStorage.clear();
    dispatch(setAuth({ isAuthorized: false }))

    window.location.reload();
  };

  useEffect(() => {
    setModalStep('auth')

    return () => {
      setModalStep('auth')
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
              {modalStep === 'auth' && <AuthForm closeFormModal={handleClose} changeForm={changeForm} />}
              {modalStep === 'register' && <RegistrationForm closeFormModal={handleClose} changeForm={changeForm} />}
              {modalStep === 'reset' && <ResetPassSendEmail sendEmail closeFormModal={handleClose} changeForm={changeForm} />}
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