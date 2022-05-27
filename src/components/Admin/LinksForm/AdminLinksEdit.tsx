import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { ILink, ILinkProps } from '../../../types/fetch';
import Button from '../../Styled/Button';
import { ReactComponent as ClearStorageIcon } from '../../../styles/img/x-svgrepo-com.svg';
import { ReactComponent as PencilIcon } from '../../../styles/img/pencil-edit-button-svgrepo-com.svg';
import { deleteLink, patchLink } from '../../../actions/Admin/adminRequests';
import { useDispatch } from 'react-redux';
import { openModal, setLoading } from '../../../store/reducer';
import axios from 'axios';


const AdminLinksEdit = ({ id, link, title, getLinks }: ILinkProps) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
  } = useForm<ILink>();

  const onSubmit = async (data: ILink) => {
    data.id = id;

    dispatch(setLoading({ isLoading: true }))
    try {
      const response = await patchLink(data);

      if (response.status === 200) {
        dispatch(openModal({
          title: 'Успешно',
          modalMsg: 'Ссылка отредактирована успешно'
        }));
        getLinks();
        setEdit(false)
      }
    }
    catch (e) {
      if (axios.isAxiosError(e)) {
        dispatch(openModal({ title: 'Ошибка!', modalMsg: `Ошибка редактирования ссылки` }));
        setEdit(false)
        console.warn('Ошибка редактирования ссылки', e.toJSON())
      }
      else {
        throw new Error('Неизвестная ошибка');
      }
    }
    finally {
      dispatch(setLoading({ isLoading: false }))
    }
  }

  const handleDelete = async () => {
    // deleteLink(id)
    dispatch(setLoading({ isLoading: true }))
    try {
      const response = await deleteLink(id);

      if (response.status === 200) {
        dispatch(openModal({
          title: 'Успешно',
          modalMsg: 'Ссылка удалена успешно'
        }));
        getLinks();
      }
    }
    catch (e) {
      if (axios.isAxiosError(e)) {
        dispatch(openModal({ title: 'Ошибка!', modalMsg: `Ошибка удаления ссылки` }));
        console.warn('Ошибка удаления ссылки', e.toJSON())
      }
      else {
        throw new Error('Неизвестная ошибка');
      }
    }
    finally {
      dispatch(setLoading({ isLoading: false }))
    }
  }

  return (
    <>
      {edit ?
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputs">

            <input defaultValue={title} autoComplete='off' {...register("title")} placeholder='Название' />
            <input defaultValue={link} autoComplete='off' {...register("link")} placeholder='Ссылка' />

            <div className="adminLinks__center">
              <Button >Редактировать ссылку</Button>
            </div>

          </div>

        </form>
        : <div className='adminLinks__center'>
          <div >{title}</div>
          <PencilIcon
            className='svg__pencil'
            onClick={() => setEdit(true)}
            title='Редактировать ссылку'
          />
          <ClearStorageIcon
            className='clearStorage_icon'
            onClick={handleDelete}
            title='Удалить ссылку'
          />

        </div>}

    </>

  )
}

export default AdminLinksEdit