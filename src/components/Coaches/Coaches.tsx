import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addCoach, deleteCoach } from "../../actions/Admin/adminRequests";
import { getCoaches } from "../../actions/fetchDB";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { openModal } from "../../store/reducer";
import { ICoach } from "../../types/fetch";
import { NewCoachValues } from "../../types/forms";
import Form from "../Styled/Form";
import Input from "../Styled/Input";
import { ReactComponent as XIcon } from "../../styles/img/x-svgrepo-com.svg";

const Coaches = () => {
  const currentCity = useTypedSelector((state) => state.city).city;
  const [coaches, setCoaches] = useState<ICoach[]>([]);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const fetchCoaches = useCallback(() => {
    getCoaches(currentCity.id)
      .then((res) => {
        if (res.status === 200) setCoaches(res.data);
      })
      .catch((res) => {
        console.warn("Ошибка загрузки", res.toJSON());
        setCoaches([]);
      });
  }, [currentCity.id]);

  useEffect(() => {
    fetchCoaches();
  }, [currentCity]);

  const handleDelete = (coachId: number) => {
    deleteCoach(coachId)
      .then(() => {
        dispatch(
          openModal({
            title: "Успешно",
            modalMsg: "Успешное удаление",
          })
        );
      })
      .catch((e) => {
        dispatch(
          openModal({
            title: "Ошибка",
            modalMsg: e.message,
          })
        );
      })
      .finally(() => fetchCoaches());
  };

  const onSubmit = (data: NewCoachValues) => {
    data.cityId = currentCity.id.toString();

    setLoading(true);
    addCoach(data)
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            openModal({
              title: "Успешно",
              modalMsg: `Тренер добавлен`,
            })
          );
        }
        setLoading(false);
      })
      .then(() => fetchCoaches())
      .catch((e) => {
        setLoading(false);

        dispatch(
          openModal({
            title: "Ошибка!",
            modalMsg: `Ошибка добавления:${e}`,
          })
        );
      });
  };

  return (
    <div id="neTable" className="neTable">
      <div className="neTable__header_head">
        <div className="neTable__header_name">Список тренеров</div>
      </div>
      <div className="neTable__header_line" />

      <div className="neTable__main">
        {coaches?.map((coach) => (
          <div className="neTable__row" key={coach.id}>
            <div onClick={() => handleDelete(coach.id)} className="pointer">
              <XIcon
                className="svg__xIcon_big svg__xIcon"
                title="Удалить тренера"
              />
            </div>
            <div className="neTable__row_column">
              <div className="neTable__row_new">
                <div className="neTable__row_hidden">{coach.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Form
        formTitle="Добавление тренера"
        buttonLabel="Сохранить"
        disabled={loading}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        centered
      >
        <Input name="name" placeholder="ФИО" />
        <div />
      </Form>
    </div>
  );
};

export default Coaches;
