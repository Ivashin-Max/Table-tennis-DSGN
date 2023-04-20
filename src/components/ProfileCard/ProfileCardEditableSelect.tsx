import { memo, useEffect, useLayoutEffect, useState } from "react";
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
import MySelect from "../MySelect";
import { getCoaches } from "../../actions/fetchDB";
import { ICoach } from "../../types/fetch";

const spanAnimation = {
  hover: { scale: 1.5 },
  tap: { scale: 1.2 },
};

const EditableSelect = ({
  title,
  id,
  user,
  editable,
  inputName,
  fixedOptions,
}: EditableInputProps & { fixedOptions?: any[] }) => {
  const [edit, setEdit] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  console.log("🚀 ~ options:", options);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>();

  const onSubmit = (data: any) => {
    if (value === ("" || user.coach)) return;
    data.rttf_id = user.rttf_id;
    data.telegram_id = user.telegram_id;
    data.coach = user.coach;
    data.category = user.category;

    delete data.id;
    data[inputName] = value;

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
  }, []);

  useEffect(() => {
    if (!fixedOptions) {
      getCoaches(user.city)
        .then((res) => {
          const options = res?.data?.map((el: ICoach) => {
            return { value: el.name, text: el.name };
          });
          setOptions(options);
        })
        .catch((res) => {
          console.warn("Ошибка загрузки", res.toJSON());
        });
    } else {
      setOptions(fixedOptions);
    }
  }, []);

  return (
    <>
      <Title capitalize>{title}</Title>

      {edit ? (
        <form onSubmit={handleSubmit(onSubmit)} className="profileCard__form">
          <div>
            <MySelect options={options} changeCallback={(e) => setValue(e)} />
            <motion.span
              variants={spanAnimation}
              whileHover="hover"
              whileTap="tap"
              className="select__ok"
            >
              <button>
                <OkIcon className="svg__pencil" title="Редактировать" />
              </button>
            </motion.span>
          </div>

          {errors.id && <p>{errors.id.message}</p>}
        </form>
      ) : (
        <div className="adminLinks__center coach">
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

export default memo(EditableSelect);
