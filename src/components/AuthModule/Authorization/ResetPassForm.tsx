import { useForm } from 'react-hook-form'
import { newPass } from '../../../actions/Profile/profileRequests'
import { newPassValue, ResetPassFormProps } from '../../../types/forms'
import Form from '../../Styled/Form'
import Input from '../../Styled/Input'

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from 'react-redux'
import { openModal } from '../../../store/reducer'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


const ResetShema = yup.object().shape({
  password: yup
    .string()
    .min(2, "Минимум 2 символа"),
});

const ResetPassForm = (props: ResetPassFormProps) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(ResetShema) });


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
    <Form
      formTitle="Введите новый пароль"
      buttonLabel="Сохранить новый пароль"
      disabled={loading}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmitReset}
      className="Войти"
    >
      <Input
        name="password"
        placeholder="Новый пароль*"
        error={errors.newPass?.message}
      />
      <></>
    </Form>
  )
}

export default ResetPassForm