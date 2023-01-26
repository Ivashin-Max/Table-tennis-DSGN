import { useForm } from 'react-hook-form'
import { newProfile } from '../../../actions/Profile/profileRequests'
import { IAuthFormsProps, RegistrationFormValues } from '../../../types/forms'
import Form from '../../Styled/Form'
import Input from '../../Styled/Input'
import Title from '../../Styled/Title';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from 'react-redux'
import { openModal } from '../../../store/reducer'
import { AutocompleteFio } from './AutocompleteFio';
import { useState } from 'react'

const AuthSchema = yup.object().shape({

  username: yup
    .string()
    .email('Неправильный формат почты ')
    .required("Обязательное поле")
  ,
  name: yup
    .string()
    .required("Обязательное поле")
  ,
  password: yup
    .string()
    .min(4, "Минимальная длинна 4 символа")
    .required("Обязательное поле")
});

const RegistrationForm = (props: IAuthFormsProps) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(AuthSchema) });



  const onSubmit = (profile: RegistrationFormValues) => {

    console.log(profile)
    setLoading(true)
    newProfile(profile)
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          dispatch(openModal({
            title: 'Успешно',
            modalMsg: `Профиль с никнеймом ${profile.username} зарегистрирован успешно`
          }))
        }
        setLoading(false)
        props.closeFormModal();

      })
      .catch(e => {
        const JSONerror = e.toJSON()
        console.warn(`Ошибка регистрации:`, JSONerror)
        setLoading(false)
        if (JSONerror.status === 409)
          dispatch(openModal({
            title: 'Ошибка!',
            modalMsg: 'Профиль уже существует'
          }))
        else {
          dispatch(openModal({
            title: 'Ошибка!',
            modalMsg: e.message
          }))
        }
      })


  }

  return (
    <>
      <Form
        formTitle="Регистрация"
        buttonLabel="Зарегистрироваться"
        disabled={loading}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        className="Войти"
      >
        <AutocompleteFio
          name="name"
          error={errors.name?.message}
        />

        <Input
          name="username"
          placeholder="E-mail*"
          error={errors.username?.message}

        />
        <Input
          name="password"
          type="password"
          placeholder="Пароль*"
          error={errors.password?.message}
        />

        <Title onClick={props.changeForm('auth')} pointer fz='12px'>Вход</Title>

      </Form>

    </>
  )
}

export default RegistrationForm