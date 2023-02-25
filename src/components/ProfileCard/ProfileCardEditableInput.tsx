import { useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";

// import { ReactComponent as ClearStorageIcon } from '../../styles/img/x-svgrepo-com.svg';
import { ReactComponent as PencilIcon } from "../../styles/img/pencil-edit-button-svgrepo-com.svg";
import { ReactComponent as OkIcon } from "../../styles/img/Tick_Mark_icon-icons.com_69146.svg";

import { motion } from "framer-motion/dist/framer-motion";
import { EditableInputProps } from "../../types/props";
import Title from "../Styled/Title";
import {
  patchProfile,
  profileInfo,
} from "../../actions/Profile/profileRequests";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/reducer";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const spanAnimation = {
  hover: { scale: 1.5 },
  tap: { scale: 1.2 },
};

const AuthSchema = yup.object().shape({
  id: yup.number().typeError("Должен содержать только цифры"),
  // .matches(/^[0-9]+$/, "Must be only digits")
});

const EditableInput = ({ title, id, user, editable }: EditableInputProps) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const inputName = title + "_id";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({ mode: "onChange", resolver: yupResolver(AuthSchema) });

  const onSubmit = (data: any) => {
    const inputValue = data.id;

    data.rttf_id = user.rttf_id;
    data.telegram_id = user.telegram_id;
    data.coach = user.coach;

    delete data.id;
    data[inputName] = inputValue;

    patchProfile(data)
      .then(() => profileInfo(user.id))
      .then((res) => {
        dispatch(
          setAuth({
            isAuthorized: true,
            fio: res.data[0].fio,
            rate_value: res.data[0].rate_value,
            tournamentsId: res.data[0].tournaments,
            userInfo: res.data[0],
          })
        );
        setEdit((prev) => !prev);
      })
      .catch((e) => console.log(e.toJSON()));
  };

  useLayoutEffect(() => {
    if (editable) setEdit(true);
    if (!id) reset({ id: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Title capitalize>{title}</Title>

      {edit ? (
        <form onSubmit={handleSubmit(onSubmit)} className="profileCard__form">
          <div>
            <input
              defaultValue={id}
              autoComplete="off"
              {...register("id")}
              placeholder="Введите ID"
            />
            <motion.span
              variants={spanAnimation}
              whileHover="hover"
              whileTap="tap"
            >
              <button>
                <OkIcon className="svg__pencil" title="Редактировать" />
              </button>
            </motion.span>
          </div>

          {errors.id && <p>{errors.id.message}</p>}
        </form>
      ) : (
        <div className="adminLinks__center">
          <div>{id}</div>
          <PencilIcon
            className="svg__pencil"
            onClick={() => setEdit(true)}
            title="Редактировать"
          />
        </div>
      )}
    </>
  );
};

export default EditableInput;
