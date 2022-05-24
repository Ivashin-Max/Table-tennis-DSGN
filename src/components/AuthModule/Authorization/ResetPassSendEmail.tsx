import { useForm } from 'react-hook-form'
import { sendEmailToResetPass } from '../../../actions/Profile/profileRequests'
import { ResetPassFormProps, ResetPassValues } from '../../../types/forms'
import Form from '../../Styled/Form'
import Input from '../../Styled/Input'
import Title from '../../Styled/Title';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from 'react-redux'
import { openModal } from '../../../store/reducer'
import { useState } from 'react'

const AuthSchema = yup.object().shape({
  mail: yup
    .string()
    .email('Неправильный формат почты ')
    .min(2, "Минимум 2 символа")
    .required("Password is required")
});


const ResetPassSendEmail = (props: ResetPassFormProps) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(AuthSchema) });




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

  return (

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

  )
}

export default ResetPassSendEmail