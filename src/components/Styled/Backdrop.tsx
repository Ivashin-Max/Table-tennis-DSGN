import React, { useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useTypedSelector } from '../../hooks/useTypedSelector';


const BackdropLoader = () => {
  const loadingState = useTypedSelector(state => state.loading).isLoading

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: 999 }}
      open={loadingState}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default BackdropLoader