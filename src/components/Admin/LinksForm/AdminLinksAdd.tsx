import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addLink } from '../../../actions/Admin/adminRequests';
import { openModal, setLoading } from '../../../store/reducer';
import { ILinksAdd } from '../../../types/fetch';
import Button from '../../Styled/Button';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Typography from '../../Styled/Typography';
// validation
export const AddLinkSchema = yup.object().shape({
    link: yup
        .string()
        .url('Ссылка в формате http(s)://*.*'),


});

const AdminLinksAdd = ({ getLinks }: any) => {

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ILinksAdd>({ resolver: yupResolver(AddLinkSchema), mode: 'onSubmit' });

    const onSubmit = async (data: ILinksAdd) => {

        console.log(data)
        try {
            dispatch(setLoading({ isLoading: true }))
            const response = await addLink(data);

            if (response.status === 200) {
                dispatch(openModal({
                    title: 'Успешно',
                    modalMsg: 'Ссылка добавлена успешно'
                }));
                reset({ link: '', title: '' })
                getLinks()
            }
        }
        catch (e) {
            if (axios.isAxiosError(e)) {
                dispatch(openModal({ title: 'Ошибка!', modalMsg: `Ошибка добавления ссылки` }));
                console.warn('Ошибка добавления ссылки', e.toJSON())
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="adminLinks__title"> Добавление новой ссылки</div>
                <div className="inputs">
                    <input autoComplete='off' {...register("link")} placeholder='Ссылка' />
                    {errors.link && <Typography color='red' fz='12px'>{errors.link.message}</Typography>}
                    <input autoComplete='off' {...register("title")} placeholder='Название' />
                </div>
                <div className="adminLinks__center">
                    <Button >Добавить ссылку</Button>
                </div>

            </form>
        </>

    )
}

export default AdminLinksAdd