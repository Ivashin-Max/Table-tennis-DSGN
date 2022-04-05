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

  const validateEmailRegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)


  const onSubmit = (profile: RegistrationFormValues) => {


    newProfile(profile)
      .then(data => console.log(data))

  }

  return (
    <SForm onSubmit={handleSubmit(onSubmit)}>
      <Title>Регистрация</Title>
      <Input control={control} name="name" rules={{ required: 'Обязательное поле' }} />
      <Input
        control={control}
        name="username"
        rules={{
          required: 'Обязательное поле',
          // pattern: { value: validateEmailRegExp, message: 'Должен содержать e-mail формата ххх@хх.хх' }
        }} />
      <Input control={control} name="password" rules={{ required: 'Обязательное поле' }} />

      <Title onClick={props.onClick}>Вход</Title>

      <Button type='submit' > Зарегистрироваться </Button>
    </SForm>
  )
}

export default RegistrationForm