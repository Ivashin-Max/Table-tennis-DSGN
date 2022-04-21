import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { ILink } from '../../../types/fetch';
import Button from '../../Styled/Button';
import { ReactComponent as ClearStorageIcon } from '../../../styles/img/x-svgrepo-com.svg';
import { ReactComponent as PencilIcon } from '../../../styles/img/pencil-edit-button-svgrepo-com.svg';
import { deleteLink, patchLink } from '../../../actions/Admin/adminRequests';


const AdminLinksEdit = ({ id, link, title }: ILink) => {
  const [edit, setEdit] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILink>();

  const onSubmit = (data: ILink) => {
    data.id = id;
    patchLink(data)
      .then(res => console.log(res.data))
    console.log(data)
  }

  const handleDelete = () => {
    deleteLink(id)
  }

  return (
    <>
      {edit ?
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputs">

            <input defaultValue={title} autoComplete='off' {...register("title")} placeholder='Название' />
            <input defaultValue={link} autoComplete='off' {...register("link")} placeholder='Ссылка' />

            <div className="adminLinks__center">
              <Button>Редактировать ссылку</Button>
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