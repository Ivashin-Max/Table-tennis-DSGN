import { useForm } from 'react-hook-form'
import { setUser } from '../../../actions/localStorage'
import { authProfile, profileInfo } from '../../../actions/Profile/profileRequests'

import Form from '../../Styled/Form'
import Input from '../../Styled/Input'
import Title from '../../Styled/Title'




import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from 'react-redux'
import { openModal, setAdminRole, setAuth, setEditorRole } from '../../../store/reducer'
import { IAuthProfileRequest } from '../../../types/profile'
import { localStorageUser } from '../../../types/localStorage'
import { IAuthFormsProps } from '../../../types/forms'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


// validation
const AuthSchema = yup.object().shape({
  username: yup
    .string()
    .required("username is required"),
  password: yup
    .string()
    .min(1, "Min password length is 2")
    .required("Password is required")
});

export const AuthForm = (props: IAuthFormsProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(AuthSchema) });
  const setRole = (roleInt: number) => {
    switch (roleInt) {
      case 0:
        console.log('user');
        sessionStorage.clear();
        break;

      case 1:
        console.log('admin');
        dispatch(setAdminRole())
        sessionStorage.setItem('admin', '1');
        navigate('/admin')
        break;

      case 2:
        console.log('editor');
        dispatch(setEditorRole())
        sessionStorage.setItem('editor', '1');
        navigate('/editor')
        break;

      default:
        break;
    }
  }
  const onSubmit = (profile: IAuthProfileRequest) => {

    console.log(profile);
    setLoading(true);
    authProfile(profile)
      .then(res => {
        console.log(11111, res)
        const user: localStorageUser = {
          jwt: `JWT ${res.data.access_token}`,
          id: res.data.id
        }
        setUser(user);
        setRole(res.data.admin);
        // console.log(`Admin? ${!!res.data.admin}`)
        // if (!!res.data.admin) {
        //   dispatch(setAdminRole())
        //   sessionStorage.setItem('admin', '1');
        //   navigate('/admin')
        // }
        // else sessionStorage.clear();

        return res.data.id
      })
      .then(id => profileInfo(id))
      .then(data => {
        dispatch(setAuth({
          isAuthorized: true, fio: data.data[0].fio, rate_value: data.data[0].rate_value,
          tournamentsId: data.data[0].tournaments,
          userInfo: data.data[0]
        }))
        setLoading(false)
        props.closeFormModal();

      }

      )
      .catch(e => {
        setLoading(false)
        dispatch(openModal({
          title: 'Ошибка',
          modalMsg: e.message
        }))
        console.log('qwqwqw', e.message)
      })

  }



  return (

    <Form
      formTitle="Вход в систему"
      buttonLabel="Войти"
      disabled={loading}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    >
      <Input
        name="username"
        placeholder="Логин"
        error={errors.username?.message}
        autoFocus
      />
      <Input
        name="password"
        type="password"
        placeholder="Пароль"
        error={errors.password?.message}
      />
      <Title onClick={props.changeForm('reset')} pointer fz='12px' >Забыли пароль?</Title>
      <Title onClick={props.changeForm('register')} pointer fz='12px' >Нет акаунта? Зарегистрируйтесь</Title>

    </Form>
  );
};

export default AuthForm;

