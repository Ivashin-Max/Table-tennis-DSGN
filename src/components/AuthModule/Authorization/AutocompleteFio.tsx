import * as React from 'react';
import TextField from '@mui/material/TextField';

import Autocomplete from '@mui/material/Autocomplete';
import { getRegistrationNames } from '../../../actions/Profile/profileRequests';
import { InputProps } from '../../../types/props';


export const AutocompleteFio: React.FC<InputProps> = ({
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
        sx={{ mb: 1, boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.082)", }}
        id="free-solo-demo"
        freeSolo
        // loading={true}
        // loadingText='Загрузка участников'
        options={names.map((participant) => participant.fio)}
        renderInput={(params) => <TextField {...params} error={error}
          autoComplete="off"
          {...register(name)}
          {...rest} label="ФИО*"
          sx={{ boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.082)", height: 1 }}
        />}
      />
    </>
  );
}

