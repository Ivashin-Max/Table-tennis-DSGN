import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  useCurrentDivision,
  useCurrentTournament,
  useCurrentZoneAndDivision,
} from "../../hooks/useCurrentTournament";
import Input from "../Styled/Input";
import Form from "../Styled/Form";
import * as React from "react";
import TextField from "@mui/material/TextField";
import DateTimePicker from "@mui/lab/DateTimePicker";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ITournamentPatch } from "../../types/fetch";
import Checkbox from "../Styled/Checkbox";
import { setSeconds, subMinutes } from "date-fns";
import {
  addTournament,
  deleteTournament,
  patchTournament,
} from "../../actions/Admin/adminRequests";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/reducer";
import { getDivisionsInfo, getParticipants } from "../../actions/fetchDB";
import AdminLinksWrapper from "./LinksForm/AdminLinksWrapper";
import { motion } from "framer-motion/dist/framer-motion";
import { ReactComponent as ClearStorageIcon } from "../../styles/img/x-svgrepo-com.svg";
import { promptAnimate } from "../../styles/animations/formAnimations";
import {
  addLocalStorageItem,
  getPromptFromLocalStorage,
  removeStorageItem,
} from "../../actions/localStorage";
import { DynamicPrizes } from "./DynamicPrizes";

// validation
const AddTournamentSchema = yup.object().shape({
  cost: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .nullable(),

  location: yup.string().required("Обязательное поле"),

  tournament_name: yup.string().required("Обязательное поле"),
});

export const AdminForm = () => {
  //   const currentDivisionName = useCurrentDivision()?.division_name;

  const currentZoneAndDivision = useCurrentZoneAndDivision();
  console.log("🚀 ~ currentZoneAndDivision", currentZoneAndDivision);
  //   const currentDivisionId = useCurrentDivision()?.id;
  const currentTournament = useCurrentTournament();
  console.log("🚀 ~ currentTournament", currentTournament);
  const [isPaid, setIsPaid] = useState(false);
  const child = useRef<any>();

  const [isRate, setIsRate] = useState(false);
  const [isPrized, setIsPrized] = useState(false);
  const [promptLocation, setPromptLocation] = useState(false);

  const showpromptLocation = () => {
    setPromptLocation(true);
  };
  const hidepromptLocation = () => {
    setPromptLocation(false);
  };

  const setLocation = (event: any) => {
    setValue("location", event.target.textContent);
    hidepromptLocation();
  };

  const [date, setDate] = React.useState<Date | null>(
    setSeconds(new Date(), 0)
  );
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("currentTournament", currentTournament);
    // console.log("currentDivisionId", currentDivisionId);
    if (currentTournament) {
      let tournamentValues = {
        cost: currentTournament.cost,
        location: currentTournament.location,
        organizer: currentTournament.organizer,
        phone: currentTournament.phone,
        rating_range: currentTournament.rating_range,
        reserve: currentTournament.reserve,
        team: currentTournament.team,
        prize: currentTournament.prize,
        tournament_name: currentTournament.tournament_name,
        dropParticipants: false,
      };

      setDate(new Date(currentTournament.date_time));
      console.log(currentTournament.rating_range);
      if (currentTournament.rating_range !== "0") setIsRate(true);
      else setIsRate(false);
      if (currentTournament.prize !== null) setIsPrized(true);
      else setIsPrized(false);
      if (currentTournament.cost !== 0) setIsPaid(true);
      else setIsPaid(false);

      reset({ ...tournamentValues });
    } else {
      setIsRate(false);
      setIsPaid(false);
      setIsPrized(false);
      let tournamentValues = {
        cost: 0,
        location: "",
        organizer: "",
        phone: "",
        rating_range: "",
        reserve: "",
        team: 0,
        tournament_name: "",
      };
      setDate(new Date());
      reset({ ...tournamentValues });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTournament]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ITournamentPatch>({
    resolver: yupResolver(AddTournamentSchema),
    mode: "onSubmit",
  });

  const onSubmit = (data: ITournamentPatch) => {
    data.cost = isPaid ? +data.cost : 0;
    data.reserve = +data.reserve;
    data.rating_range = isRate ? data.rating_range : "0";
    data.date_time = date?.toJSON().slice(0, 16).replace("T", " ");

    data.division = currentZoneAndDivision?.division.id;
    data.prize = "{}";

    if (child.current) {
      const jsonPrize = JSON.stringify(child.current.submit());
      data.prize = jsonPrize;
    }

    console.log(data);

    addLocalStorageItem("location", data.location);
    if (currentTournament) {
      data.tournament_id = currentTournament.id;

      patchTournament(data)
        .then((res) => {
          console.log(11111, res);
          if (res.status === 200) {
            dispatch(
              openModal({
                title: "Успешно!",
                modalMsg: "Турнир отредактирован",
              })
            );
          }
        })
        .then(() => {
          dispatch(getDivisionsInfo());
          if (data.dropParticipants)
            dispatch(getParticipants(data.tournament_id));
        })
        .catch((e) => {
          dispatch(
            openModal({
              title: "Ошибка",
              modalMsg: e.message,
            })
          );
          console.log("Error", e.toJSON());
        });
    } else {
      addTournament(data)
        .then((res) => {
          console.log(11111, res);
          dispatch(
            openModal({
              title: "Успешно!",
              modalMsg: res.data,
            })
          );
        })
        .then(() => {
          dispatch(getDivisionsInfo());
        })
        .catch((e) => {
          dispatch(
            openModal({
              title: "Ошибка",
              modalMsg: e.message,
            })
          );
          console.log("Error", e.message);
        });
    }
  };

  const handleDelete = () => {
    if (currentTournament) {
      deleteTournament(currentTournament.id)
        .then((res) => {
          console.log(res);
          dispatch(
            openModal({
              title: "Успешно",
              modalMsg: res.data,
            })
          );
        })
        .then(() => {
          dispatch(getDivisionsInfo());
        })
        .catch((e) => {
          dispatch(
            openModal({
              title: "Ошибка",
              modalMsg: e.message,
            })
          );
          console.log("Error", e.message);
        });
    }
  };

  const getFormTitle = () => {
    let title;
    if (currentTournament)
      title = `Редактирование турнира ${currentTournament.tournament_name} зоны ${currentZoneAndDivision?.zone.name}`;
    else
      title =
        currentZoneAndDivision?.division && currentZoneAndDivision?.zone
          ? `Добавление турнира в ${currentZoneAndDivision.division.division_name} дивизион зоны ${currentZoneAndDivision?.zone.name}`
          : `Выбери дивизион`;
    return title;
  };

  return (
    <>
      <div
        className="form_wrap"
        onMouseDown={() => {
          hidepromptLocation();
        }}
      >
        <Form
          largeForm
          formTitle={getFormTitle()}
          buttonLabel={
            currentTournament ? "Редактировать турнир" : "Добавить турнир"
          }
          disabled={currentZoneAndDivision ? false : true}
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        >
          {currentTournament && (
            <button
              type="button"
              className="admin__deleteButton"
              onClick={handleDelete}
            >
              Удалить турнир
            </button>
          )}
          <Input
            name="tournament_name"
            placeholder="Название турнира"
            error={errors.tournament_name?.message}
          />

          <Input
            name="location"
            placeholder="Место проведения"
            className="location"
            onClick={showpromptLocation}
            // error={errors.location?.message}
          />
          <div className="location">
            <div
              onMouseDown={() => {
                removeStorageItem("location");
                hidepromptLocation();
              }}
              className="clearStorage clearStorage__admin"
            >
              <ClearStorageIcon
                className="clearStorage_icon"
                title="Очистить историю"
              />
            </div>
            {promptLocation && (
              <motion.div
                animate={{ height: "auto" }}
                initial={{ height: 0 }}
                className="fioPrompt fioPrompt__location"
              >
                {getPromptFromLocalStorage("location").map(
                  (location, index) => {
                    return (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        custom={index + 2}
                        variants={promptAnimate}
                        key={location}
                        onMouseDown={setLocation}
                      >
                        {location}
                      </motion.div>
                    );
                  }
                )}
              </motion.div>
            )}
          </div>

          <Input
            name="phone"
            placeholder="Номер тлф"
            // // error={errors.phone?.message}
          />

          <Input
            name="organizer"
            placeholder="ФИО организатора"
            // // error={errors.organizer?.message}
          />
          <Input
            name="reserve"
            type="number"
            placeholder="Лимит участников"
            // // error={errors.reserve?.message}
          />
          <div className="admin__checkbox">
            <input
              type="checkbox"
              name="paid"
              id="rate"
              checked={isRate}
              onChange={() => setIsRate((prev) => !prev)}
            />
            <label htmlFor="rate">Ограничен по рейтингу?</label>
          </div>

          {isRate && (
            <Input
              name="rating_range"
              placeholder="Рейтинг"
              // // error={errors.rating_range?.message}
            />
          )}

          <div className="admin__checkbox">
            <input
              type="checkbox"
              name="prize"
              id="prize"
              checked={isPrized}
              onChange={() => setIsPrized((prev) => !prev)}
            />
            <label htmlFor="prize">Приз?</label>
          </div>

          {isPrized && (
            <>
              <DynamicPrizes
                // formFields={true}
                ref={child}
              />
            </>
          )}

          <div className="admin__checkbox">
            <input
              type="checkbox"
              name="paid"
              id="paid"
              checked={isPaid}
              onChange={() => setIsPaid((prev) => !prev)}
            />
            <label htmlFor="paid">Платный?</label>
          </div>

          {isPaid && (
            <Input
              name="cost"
              type="number"
              placeholder="Стоимость турнира"
              // // error={errors.cost?.message}
            />
          )}

          <DateTimePicker
            renderInput={(params) => <TextField sx={{ mb: 1 }} {...params} />}
            label="Дата"
            value={date}
            mask="__.__.____ __:__"
            onChange={(newValue) => {
              setDate(newValue);
            }}
            minDateTime={subMinutes(new Date(), 10)}
          />

          <Checkbox
            name="team"
            label="Командный?"
            className="admin__checkbox"
            // // error={errors.team?.message}
          />

          {currentTournament && (
            <Checkbox
              name="dropParticipants"
              label="Очистить?"
              className="admin__checkbox"
              // // error={errors.team?.message}
            />
          )}
        </Form>
        <AdminLinksWrapper />

        <div className="profileCard__line" />
        <label className="drop" htmlFor="chacor1">
          Важные ссылки
        </label>
      </div>
    </>
  );
};

export default AdminForm;
