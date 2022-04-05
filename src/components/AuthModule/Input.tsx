import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import styled from 'styled-components';
import { RegistrationFormValues, RegistrationFormStyleProps, AuthFormValues } from '../../types/forms';
import Typography from './Typography';

const SInput = styled.input`
  display:block;
  margin-bottom: 14px;
`

const Input = (props: UseControllerProps<RegistrationFormValues>) => {
  const { field, fieldState } = useController(props);

  return (
    <>
      <SInput  {...field} />
      <Typography align='left' color='red'>{fieldState.error?.message}</Typography>

    </>
  )
}

export default Input