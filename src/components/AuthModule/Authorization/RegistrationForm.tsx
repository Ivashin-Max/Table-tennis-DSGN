import React from 'react'
import { useForm } from 'react-hook-form'
import { newProfile } from '../../../actions/Profile/profileRequests'
import { RegistrationFormValues } from '../../../types/forms'
import Button from '../Button'
import SForm from '../Form'
import Input from '../Input'
import Title from '../Title'

const RegistrationForm = (props: any) => {
  const { handleSubmit, control } = useForm<RegistrationFormValues>({
    defaultValues: {
      name: "",
      username: "",
      password: "",
    },
    mode: "onChange"
  });

  const validateEmailRegExp = '/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/'


  const onSubmit = (profile: RegistrationFormValues) => {


    newProfile(profile)
      .then(data => console.log(data))

  }

  return (
    <SForm onSubmit={handleSubmit(onSubmit)}>
      <Title>Регистрация</Title>
      <Input control={control} name="name" rules={{ required: 'Обязательное поле' }} />
      <Input control={control} name="username" rules={{ required: 'Обязательное поле' }} />
      <Input control={control} name="password" rules={{ required: 'Обязательное поле' }} />

      <Title onClick={props.onClick}>Вход</Title>

      <Button type='submit' > Зарегистрироваться </Button>
    </SForm>
  )
}

export default RegistrationForm