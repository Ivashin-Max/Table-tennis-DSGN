import { useForm } from 'react-hook-form';
import { addLink } from '../../../actions/Admin/adminRequests';
import { ILinksAdd } from '../../../types/fetch';
import Button from '../../Styled/Button';

const AdminLinksAdd = () => {





  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILinksAdd>();

  const onSubmit = (data: ILinksAdd) => {

    addLink(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="adminLinks__title"> Добавление новой ссылки</div>
        <div className="inputs">
          <input autoComplete='off' {...register("link")} placeholder='Ссылка' />
          <input autoComplete='off' {...register("title")} placeholder='Название' />
        </div>
        <div className="adminLinks__center">
          <Button>Добавить ссылку</Button>
        </div>

      </form>
    </>

  )
}

export default AdminLinksAdd