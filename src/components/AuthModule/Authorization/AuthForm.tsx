import { Box } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { AuthFormValues, RegistrationFormValues } from '../../../types/forms'
import Button from '../Button'
import SForm from '../Form'
import Input from '../Input'
import Title from '../Title'


const AuthForm = (props: any) => {
  const { handleSubmit, control } = useForm<RegistrationFormValues>({
    defaultValues: {
      username: "",
      password: ""
    },
    mode: "onChange"
  });
  const onSubmit = (data: RegistrationFormValues) => console.log(data);


  return (
    <SForm onSubmit={handleSubmit(onSubmit)}>
      <Title>Вход в систему</Title>
      <Input control={control} name="username" rules={{ required: 'Обязательное поле' }} />
      <Input control={control} name="password" rules={{ required: 'Обязательное поле' }} />

      <Title onClick={props.onClick}>Регистрация</Title>

      <Button type='submit' > Войти </Button>
    </SForm>
  )
}

export default AuthForm