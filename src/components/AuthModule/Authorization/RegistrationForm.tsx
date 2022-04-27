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
import { FreeSolo } from '../../Test/Test';
import { useState } from 'react'

const AuthSchema = yup.object().shape({
  // name: yup
  //   .string()
  //   .required("Обязательное поле"),
  // username: yup
  //   .string()
  //   .required("Обязательное поле"),
  password: yup
    .string()
    .min(2, "Минимум 2 символа")
    .required("Password is required")
});

const RegistrationForm = (props: IAuthFormsProps) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(AuthSchema) });


  // const validateEmailRegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)


  const onSubmit = (profile: RegistrationFormValues) => {

    console.log(profile)
    setLoading(true)
    newProfile(profile)
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          dispatch(openModal({
            title: 'Успешно',
            modalMsg: response.data
          }))
        }
        setLoading(false)
        props.closeFormModal();

      })
      .catch(e => {
        console.log(e)
        setLoading(false)
        dispatch(openModal({
          title: 'Ошибка!',
          modalMsg: e.message
        }))
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
        <FreeSolo name="name" />
        {/* <Input
          name="name"
          placeholder="Фио*"
          error={errors.name?.message}
          autoFocus
        /> */}
        <Input
          name="username"
          placeholder="Логин*"
          error={errors.username?.message}

        />
        <Input
          name="password"
          type="password"
          placeholder="Пароль*"
          error={errors.password?.message}
        />

        <Title onClick={props.changeForm} pointer fz='12px'>Вход</Title>

      </Form>

    </>
  )
}

export default RegistrationForm