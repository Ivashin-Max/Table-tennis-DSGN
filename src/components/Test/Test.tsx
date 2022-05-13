import * as React from 'react';
import TextField from '@mui/material/TextField';

import Autocomplete from '@mui/material/Autocomplete';
import { getRegistrationNames } from '../../actions/Profile/profileRequests';
import { InputProps } from '../../types/props';
import styled from 'styled-components';

const SInput = styled.input<InputProps>`
  display:block;
  margin-bottom: 14px;
  width: 240px;
    height: 33px;
    border: 1px solid #535e692a;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.082);
    border-radius: 2px;
    padding-left: 10px;

    &:focus {
      box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.25);
      transition: 0.4s ease;
      opacity: 1;
    }
  ${props => props.error && `
    border-color:red
  `} 
`


export const FreeSolo: React.FC<InputProps> = ({
  register,
  name,
  error,
  label,
  ...rest
}) => {
  const [names, setNames] = React.useState<any[]>([])
  React.useEffect(() => {
    getRegistrationNames()
      .then(res => {
        setNames(res.data)
      })


  }, [])

  return (
    <>
      <Autocomplete
        sx={{ mb: 1, boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.082)" }}
        id="free-solo-demo"
        freeSolo
        // loading={true}
        // loadingText='Загрузка участников'
        options={names.map((participant) => participant.fio)}
        renderInput={(params) => <TextField {...params} error={error}
          autoComplete="off"
          {...register(name)}
          {...rest} label="ФИО*" />}
      />
    </>
  );
}

