import { useForm } from 'react-hook-form'
import { newPass, sendEmailToResetPass } from '../../../actions/Profile/profileRequests'
import { newPassValue, ResetPassFormProps, ResetPassValues } from '../../../types/forms'
import Form from '../../Styled/Form'
import Input from '../../Styled/Input'
import Title from '../../Styled/Title';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from 'react-redux'
import { openModal } from '../../../store/reducer'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const AuthSchema = yup.object().shape({


  mail: yup
    .string()
    .email('Неправильный формат почты ')
    .min(2, "Минимум 2 символа")
    .required("Password is required")
});

const ResetShema = yup.object().shape({
  password: yup
    .string()
    .min(2, "Минимум 2 символа"),
});

const ResetPassSendEmail = (props: ResetPassFormProps) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(AuthSchema) });

  const {
    register: resetRegister,
    handleSubmit: resetHandleSubmit,
    formState: { errors: resetErrors }
  } = useForm({ resolver: yupResolver(ResetShema) });



  const onSubmit = (mail: ResetPassValues) => {

    console.log(mail)
    setLoading(true)
    sendEmailToResetPass(mail.mail)
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          dispatch(openModal({
            title: 'Успешно',
            modalMsg: `Ссылка для сброса пароля отправлена на ${mail.mail}`
          }))
        }
        setLoading(false)
      })
      .catch(e => {
        const errorJSON = e.toJSON();
        setLoading(false)
        if (errorJSON.status === 404) {
          console.warn('Ошибка сброса пароля:', errorJSON)
          dispatch(openModal({
            title: 'Ошибка!', modalMsg: `Ошибка сброса пароля: пользователь с почтой ${mail.mail} не зарегистрирован`
          }));
        }
        else {
          console.warn('Ошибка удаления:', errorJSON)
          dispatch(openModal({ title: 'Ошибка!', modalMsg: `Ошибка сброса пароля:${errorJSON.message}` }));
        }
      })

  }

  const onSubmitReset = (newPassValue: newPassValue) => {

    const jwtt = location.search.split('=')[1]
    console.log(newPassValue)
    console.log(jwtt)
    setLoading(true)
    newPass(newPassValue, jwtt)
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          dispatch(openModal({
            title: 'Успешно',
            modalMsg: `Пароль изменён`
          }))
          navigate('/user')
        }
        setLoading(false)

      })
      .catch(e => {
        console.log(e.toJSON())
        setLoading(false)
        dispatch(openModal({
          title: 'Ошибка!',
          modalMsg: e.message
        }))
      })

  }

  return (
    <>

      {props.sendEmail &&
        <>
          <Form
            formTitle="Смена пароля"
            buttonLabel="Отправить пароль на почту"
            disabled={loading}
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            className="Войти"
          >
            <Input
              name="mail"
              placeholder="Почта*"
              error={errors.mail?.message}

            />
            <Title onClick={props.changeForm('auth')} pointer fz='12px'>Вход</Title>
          </Form>
        </>
      }

      {!props.sendEmail &&
        <>

          <Form
            formTitle="Введите новый пароль"
            buttonLabel="Сохранить новый пароль"
            disabled={loading}
            register={resetRegister}
            handleSubmit={resetHandleSubmit}
            onSubmit={onSubmitReset}
            className="Войти"
          >
            <Input
              name="password"
              placeholder="Новый пароль*"
              error={resetErrors.newPass?.message}

            />
          </Form>
        </>
      }


    </>
  )
}

export default ResetPassSendEmail