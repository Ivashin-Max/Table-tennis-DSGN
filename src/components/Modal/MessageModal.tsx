import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { closeModal } from '../../store/reducer';
import styled from 'styled-components';

const SModal = styled.div`
  min-height: 200px;
  min-width: 400px;
  display:flex;
  align-items:center;
  justify-content:center;
`

const STitle = styled.h1`
    text-align: center;
    margin-top: 10px;
`

export default function MessageModal() {
  const { active, modalMsg, title } = useTypedSelector(state => state.modal);
  const dispatch = useDispatch();



  const handleClose = () => {
    dispatch(closeModal())
  };

  return (
    <>
      <Dialog
        open={active}
        onClose={handleClose}
      >
        <DialogContent>
          <STitle>{title}</STitle>
          <SModal>

            <p>{modalMsg}</p>
          </SModal>
        </DialogContent>
      </Dialog>
    </>
  );
}