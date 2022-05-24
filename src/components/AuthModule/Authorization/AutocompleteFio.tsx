import * as React from 'react';
import TextField from '@mui/material/TextField';

import Autocomplete from '@mui/material/Autocomplete';
import { getRegistrationNames } from '../../../actions/Profile/profileRequests';
import { InputProps } from '../../../types/props';
import Typography from '../../Styled/Typography';


export const AutocompleteFio: React.FC<InputProps> = ({
  register,
  name,
  error,
  label,
  ...rest
}) => {
  const [names, setNames] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    getRegistrationNames()
      .then(res => {
        setNames(res.data);
        setLoading(false)
      })
      .catch(res => {
        console.warn('Ошибка загрузки участников', res.toJSON())
        setLoading(false)
      })


  }, [])

  return (
    <>
      <Autocomplete
        sx={{ mb: 1, boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.082)", }}
        id="free-solo-demo"
        freeSolo
        loading={loading}
        // key={option => option.id}
        loadingText='Загрузка...'
        options={names}
        getOptionLabel={option => option.fio}
        renderOption={(props, option) => {
          return (
            <span {...props} key={option.id}>
              {option.fio}
            </span>
          );
        }}

        renderInput={(params) => <TextField {...params}
          autoComplete="off"
          {...register(name)}

          {...rest} label="ФИО*"
          sx={{ boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.082)", height: 1 }}
        />}

      />
      {error &&
        <Typography align='left' color='red' fz='12px'>{error}</Typography>
      }
    </>
  );
}

