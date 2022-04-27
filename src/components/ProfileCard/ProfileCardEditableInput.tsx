import { useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

// import { ReactComponent as ClearStorageIcon } from '../../styles/img/x-svgrepo-com.svg';
import { ReactComponent as PencilIcon } from '../../styles/img/pencil-edit-button-svgrepo-com.svg';
import { ReactComponent as OkIcon } from '../../styles/img/Tick_Mark_icon-icons.com_69146.svg';
import { ILink } from '../../types/fetch';

import { patchLink, deleteLink } from '../../actions/Admin/adminRequests';
import Button from '../Styled/Button';
import { motion, animate, AnimatePresence } from 'framer-motion/dist/framer-motion';
import { EditableInputProps } from '../../types/props';
import Title from '../Styled/Title';
import { patchProfile, profileInfo } from '../../actions/Profile/profileRequests';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../store/reducer';

const spanAnimation = {
  hover: { scale: 1.5 },
  tap: { scale: 1.2 }
};

const EditableInput = ({ title, id, user, editable }: EditableInputProps) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const inputName = title + '_id';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<any>();

  const onSubmit = (data: any) => {
    const inputValue = data.id;
    console.log(user)

    data.rttf_id = user.rttf_id;
    data.telegram_id = user.telegram_id;
    delete data.id;
    data[inputName] = inputValue;
    console.log(data)
    patchProfile(data)
      .then(() => profileInfo(user.id))
      .then(res => {
        dispatch(setAuth({
          isAuthorized: true, fio: res.data[0].fio, rate_value: res.data[0].rate_value,
          tournamentsId: res.data[0].tournaments,
          userInfo: res.data[0]

        }))
        setEdit(prev => !prev)
      })
      .catch(e => console.log(e.toJSON()))

    // data.inputName = data[inputName]
    // // if (user.)
    // // patchLink(data)
    // //   .then(res => console.log(res.data))
    // console.log(data)

  }
  useLayoutEffect(() => {
    if (editable) setEdit(true)
    console.log('id', id)
    if (!id) reset({ id: '' })
  }, [])


  return (
    <>
      <Title capitalize>
        {title}
      </Title>

      {edit ?
        <form onSubmit={handleSubmit(onSubmit)} className="profileCard__form" >


          <input defaultValue={id} autoComplete='off' {...register('id')} placeholder='Введите ID' />
          <motion.span
            variants={spanAnimation}
            whileHover="hover"
            whileTap="tap"
          >
            <button>
              <OkIcon
                className='svg__pencil'
                title='Редактировать'
              />
            </button>



          </motion.span>






        </form>
        : <div className='adminLinks__center'>
          <div >{id}</div>
          <PencilIcon
            className='svg__pencil'
            onClick={() => setEdit(true)}
            title='Редактировать'
          />

        </div>}

    </>

  )
}

export default EditableInput