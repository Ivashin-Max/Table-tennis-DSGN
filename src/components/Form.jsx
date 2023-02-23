import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import logoPingPong from "../styles/img/ping-pong.svg";

import logoPingPongLoader from "../styles/img/ping-pong-loader.svg";
import person from "../styles/img/personBlue.svg";
import logoTelegramm from "../styles/img/telegram-svgrepo-com.svg";
// import { fetchTableData } from '../actions/fetchTableData';
import { useDispatch } from "react-redux";
import {
  removeStorageItem,
  addLocalStorageItem,
  getPromptFromLocalStorage,
} from "../actions/localStorage";
import { ReactComponent as CalendarIcon } from "../styles/img/calendar-new.svg";
import InputMask from "react-input-mask";
import Tooltip from "rc-tooltip";
import { openModal, setCalendarMode } from "../store/reducer";
import ReactCardFlip from "react-card-flip";
import { ReactComponent as ClearStorageIcon } from "../styles/img/x-svgrepo-com.svg";
import { ReactComponent as PrizeIcon } from "../styles/img/gift-svgrepo-com.svg";
import classNames from "classnames";
import { useCurrentTournament } from "../hooks/useCurrentTournament";
import {
  addParticipant,
  deleteParticipantDB,
  getLinks,
  getParticipants,
} from "../actions/fetchDB";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { checkDate } from "../actions/date";
import { motion } from "framer-motion/dist/framer-motion";
import url from "../static/url.json";
import MyCalendar from "./Calendar/Calendar";
import { promptAnimate } from "../styles/animations/formAnimations";
import AutocompleteFio from "./AuthModule/Authorization/AutocompleteFio";
import { useForm } from "react-hook-form";
import { getCurrentTournamentByQuery } from "../actions";

const alignConfig = {
  // the offset sourceNode by 10px in x and 20px in y,
  targetOffset: ["60%", "-200%"], // the offset targetNode by 30% of targetNode width in x and 40% of targetNode height in y,
  overflow: { adjustX: true, adjustY: true }, // auto adjust position when sourceNode is overflowed
};

const alignConfigTop = {
  // the offset sourceNode by 10px in x and 20px in y,
  targetOffset: ["-200%", "100%"], // the offset targetNode by 30% of targetNode width in x and 40% of targetNode height in y,
  overflow: { adjustX: true, adjustY: true }, // auto adjust position when sourceNode is overflowed
};

const Form = () => {
  const { register, getValues } = useForm();
  const [loading, setLoading] = useState(false);
  const [promptFio, setpromptFio] = useState(false);
  const [isLate, setIsLate] = useState(true);
  const fioInputRef = useRef();
  const formRef = useRef();

  const authState = useTypedSelector((state) => state.auth);
  const calendarMode = useTypedSelector(
    (state) => state.calendarMode.calendarMode
  );

  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.data);

  const [links, setLinks] = useState([]);
  const [fio, setFio] = useState("");
  const [fio2, setFio2] = useState("");
  const [tell, setTell] = useState("");
  const currentTournament = useCurrentTournament();
  const currentCity = useTypedSelector((state) => state.city).city;

  let classNameGreen = classNames({
    buttons_disabled: isLate,
    buttons_green: !isLate,
  });
  let classNameRed = classNames({
    buttons_disabled: isLate,
    buttons_red: !isLate,
  });

  React.useEffect(() => {
    if (currentTournament) {
      setIsLate(checkDate(currentTournament.date_time));
    }
  }, [currentTournament]);

  React.useEffect(() => {
    getLinks()
      .then(({ data }) => {
        setLinks(data);
      })
      .catch(function (error) {
        console.log(error.toJSON());
        setLinks([{ id: 1, title: "Ошибка загрузки ссылок", link: "#" }]);
      });
  }, []);

  React.useEffect(() => {
    if (authState.isAuthorized) setFio(authState.fio);
  }, [authState]);

  //   React.useEffect(() => {
  //     fioInputRef.current.focus()
  //   }, [calendarMode])

  const prizesParse = () => {
    let prizesObj = [];
    let counter = 0;
    try {
      prizesObj = Object.entries(JSON.parse(storeData.tournamentPrizes)).filter(
        (el) => el[0] !== "formFields"
      );
    } catch (e) {
      console.log("prizes Error", e);
      flipCalendar();
    }

    for (let i = 0; i < prizesObj.length; i++) {
      const element = prizesObj[i];
      if (element[1].length > 0) counter++;
    }
    if (counter === 0) return false;
    return (
      <>
        <div className="prizes__header">Призовой фонд</div>

        {prizesObj.map((titleArr) => {
          if (titleArr[1].length === 0) return null;
          return (
            <div key={titleArr[1]}>
              <p>{titleArr[0] === "rest" ? "" : titleArr[0]}</p>
              <div>
                {titleArr[1].map((prize) => (
                  <div className="prizes__block" key={prize.prize}>
                    <div className="prizes__name">{prize.name}</div>
                    <div>{prize.prize}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </>
    );
  };

  const checkEmptyInputs = (checkCoach) => {
    if (fio.trim() === "") {
      dispatch(openModal({ title: "Ошибка!", modalMsg: "Введите ФИО" }));

      setLoading(false);
      return false;
    } else if (tell.length !== 17 && !authState.isAuthorized) {
      dispatch(
        openModal({
          title: "Ошибка!",
          modalMsg: "Введите телефон в корректном формате",
        })
      );
      setLoading(false);
      return false;
    } else if (checkCoach) {
      if (getValues().coach === "") {
        dispatch(
          openModal({
            title: "Ошибка!",
            modalMsg: "Выберите тренера из предложенного списка",
          })
        );
        setLoading(false);
        return false;
      }
    }
  };

  const getPassword = () => {
    if (authState.isAuthorized) {
      const tlgId = authState.userInfo.telegram_id;
      if (tlgId && tlgId !== 0) return tlgId;
      else return authState.userInfo.id;
    } else return tell;
  };

  const deleteParticipant = async (e) => {
    e.preventDefault();
    const emptyInputs = checkEmptyInputs();

    if (emptyInputs !== false) {
      const { trimmedFio1, trimmedFio2 } = trimFios();
      const participant = {
        tournamentId: currentTournament.id,
        name: trimmedFio1,
        name_2: currentTournament.team ? trimmedFio2 : "",
        password: getPassword(),
      };
      try {
        const response = await deleteParticipantDB(participant);
        if (response.status === 200) {
          const query = getCurrentTournamentByQuery();
          if (query)
            await dispatch(
              getParticipants(query.city, query.zone, query.div, query.tour)
            );
          dispatch(
            openModal({
              title: "Успешно",
              modalMsg: currentTournament.team
                ? `Участники ${trimmedFio1}, ${trimmedFio2} удалены успешно`
                : `Участник ${trimmedFio1} удален успешно`,
            })
          );
        }
      } catch (e) {
        const errorJSON = e.toJSON();
        if (authState.isAuthorized) {
          const participant = {
            tournamentId: currentTournament.id,
            name: fio,
            name_2: currentTournament.team ? fio2 : "",
            password: authState.userInfo.id,
          };
          try {
            const response = await deleteParticipantDB(participant);
            if (response.status === 200) {
              const query = getCurrentTournamentByQuery();
              if (query)
                await dispatch(
                  getParticipants(query.city, query.zone, query.div, query.tour)
                );

              dispatch(
                openModal({
                  title: "Успешно",
                  modalMsg: currentTournament.team
                    ? `Участники ${trimmedFio1}, ${trimmedFio2} удалены успешно`
                    : `Участник ${trimmedFio1} удален успешно`,
                })
              );
            }
          } catch (e) {
            const errorJSON = e.toJSON();
            if (errorJSON.status === 404) {
              console.warn("Ошибка удаления:", errorJSON);
              dispatch(
                openModal({
                  title: "Ошибка!",
                  modalMsg: `Ошибка удаления: участник не найден`,
                })
              );
            } else {
              console.warn("Ошибка удаления:", errorJSON);
              dispatch(
                openModal({
                  title: "Ошибка!",
                  modalMsg: `Ошибка удаления:${errorJSON.message}`,
                })
              );
            }
          }
        }
        if (errorJSON.status === 404) {
          console.warn("Ошибка удаления:", errorJSON);
          dispatch(
            openModal({
              title: "Ошибка!",
              modalMsg: `Ошибка удаления: участник не найден`,
            })
          );
        } else {
          console.warn("Ошибка удаления:", errorJSON);
          dispatch(
            openModal({
              title: "Ошибка!",
              modalMsg: `Ошибка удаления:${errorJSON.message}`,
            })
          );
        }
      }
    }
  };

  const trimFios = () => {
    let trimmedFio1 = fio;
    let trimmedFio2 = fio2;

    try {
      trimmedFio1 = fio.trimStart().trimEnd();
      trimmedFio2 = fio2.trimStart().trimEnd();
    } catch (e) {
      console.log(
        "Ошибка удаления пробелов из ФИО, функционал не поддерживается браузером"
      );
    }

    return { trimmedFio1: trimmedFio1, trimmedFio2: trimmedFio2 };
  };

  const newParticipant = async (e) => {
    e.preventDefault();
    const emptyInputs = checkEmptyInputs(true);

    if (emptyInputs !== false) {
      setLoading(true);
      const { trimmedFio1, trimmedFio2 } = trimFios();
      const newParticipant = {
        tournamentId: currentTournament.id,
        name: trimmedFio1,
        name_2: currentTournament.team ? trimmedFio2 : "",
        password: getPassword(),
        coach: getValues().coach,
      };
      console.log("newParticipant", newParticipant);
      addLocalStorageItem("fio", fio);

      try {
        const response = await addParticipant(newParticipant);

        if (response.status === 200) {
          const query = getCurrentTournamentByQuery();
          if (query)
            await dispatch(
              getParticipants(query.city, query.zone, query.div, query.tour)
            );

          dispatch(
            openModal({
              title: "Успешно",
              modalMsg: currentTournament.team
                ? `Участники ${fio}, ${fio2} добавлены успешно`
                : `Участник ${fio} добавлен успешно`,
            })
          );
        }
      } catch (e) {
        const errorJSON = e.toJSON();
        if (errorJSON.status === 406) {
          dispatch(
            openModal({
              title: "Ошибка!",
              modalMsg: `Ошибка добавления: такой участник уже зарегистрирован`,
            })
          );
        } else {
          console.warn("Ошибка добавления", errorJSON);
          dispatch(
            openModal({
              title: "Ошибка!",
              modalMsg: `Ошибка добавления:${errorJSON.message}`,
            })
          );
        }
      }

      setLoading(false);
    }
  };

  const flipCalendar = () => {
    dispatch(setCalendarMode({ calendarMode: false }));
  };

  const flipForm = () => {
    dispatch(setCalendarMode({ calendarMode: true }));
  };

  const showpromptFio = () => {
    setpromptFio(true);
  };
  const hidepromptFio = () => {
    setpromptFio(false);
  };

  const autoCompleteFio = (event) => {
    setFio(event.target.textContent);
    hidepromptFio();
  };

  if (loading) {
    return (
      <form action="#" id="form" className="form">
        <object
          className="loader_rocket_big"
          type="image/svg+xml"
          data={logoPingPongLoader}
        >
          svg-animation
        </object>
      </form>
    );
  }

  return (
    <>
      <button
        className="plus radius"
        type="button"
        onClick={() => {
          formRef.current.scrollIntoView();
          //   fioInputRef.current.focus()
        }}
      ></button>
      <ReactCardFlip isFlipped={calendarMode} flipDirection="horizontal">
        <div className="form_wrap">
          <form action="#" id="form" className="form" ref={formRef}>
            <section className="form_header">
              <a
                href={url.bot}
                target="_blank"
                className="form_header_vk"
                rel="noreferrer"
              >
                <img
                  className="form_header_img left"
                  src={logoTelegramm}
                  alt="telegram Logo"
                />
                <span className="span black">Бот</span>
              </a>

              <div>
                <p id="tournamentAdress">{storeData.tournamentPlace}</p>
                <Tooltip
                  placement="right"
                  overlay={
                    <div className="org_tooltip">
                      <span className="org_tooltip_fio">
                        {storeData.tournamentOrgFio}
                      </span>
                    </div>
                  }
                  trigger={["hover"]}
                  mouseLeaveDelay={0}
                  align={alignConfig}
                >
                  <p id="tournamentTell">
                    {storeData.tournamentTell}
                    <img className="person" src={person} alt="personIcon" />
                  </p>
                </Tooltip>
              </div>
              <img
                className="form_header_img right"
                src={logoPingPong}
                alt="red rocket"
              />
            </section>

            <div className="inputs">
              <div className="placeholder-container">
                <div
                  onMouseDown={() => {
                    removeStorageItem("fio");
                    removeStorageItem("tell");
                  }}
                  className="clearStorage"
                >
                  <ClearStorageIcon
                    className="clearStorage_icon"
                    title="Очистить историю"
                  />
                </div>
                {promptFio && (
                  <motion.div
                    animate={{ height: "auto" }}
                    initial={{ height: 0 }}
                    className="fioPrompt"
                  >
                    {authState.fio && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        custom={1}
                        variants={promptAnimate}
                        onMouseDown={autoCompleteFio}
                      >
                        {authState.fio}
                      </motion.div>
                    )}
                    {getPromptFromLocalStorage("fio").map((name, index) => {
                      if (name === authState.fio) return null;
                      else
                        return (
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            custom={index + 2}
                            variants={promptAnimate}
                            key={name}
                            onMouseDown={autoCompleteFio}
                          >
                            {name}
                          </motion.div>
                        );
                    })}
                  </motion.div>
                )}

                <input
                  type="text"
                  placeholder=" "
                  id="newParticipantName"
                  autoComplete="off"
                  ref={fioInputRef}
                  value={fio}
                  onChange={(event) => setFio(event.target.value)}
                  onClick={showpromptFio}
                  onBlur={hidepromptFio}
                />
                <label>Ваше ФИО</label>
              </div>

              {!authState?.isAuthorized && (
                <>
                  <AutocompleteFio
                    register={register}
                    onlyAllowedOptions
                    name="coach"
                    label="Тренер*"
                    coachCityId={currentCity.id}
                  />
                </>
              )}

              {!authState.isAuthorized && (
                <div className="placeholder-container">
                  <InputMask
                    mask="+7\(999)-999-99-99"
                    maskChar=""
                    id="participantTell"
                    autoComplete="off"
                    placeholder=" "
                    value={tell}
                    onChange={(event) => setTell(event.target.value)}
                  />

                  <label>Ваш телефон</label>
                </div>
              )}
            </div>
            <div className="price">
              Стоимость участия:{" "}
              {storeData.tournamentPrice > 0
                ? `${storeData.tournamentPrice} рублей`
                : "бесплатно"}
            </div>

            <div className="buttons">
              <button
                className={classNameGreen}
                onClick={newParticipant}
                disabled={isLate}
              >
                <span>
                  {isLate ? "Регистрация окончена" : "Записаться на турнир"}
                </span>
              </button>
              <button
                className={classNameRed}
                onClick={deleteParticipant}
                disabled={isLate}
              >
                Удалиться с турнира
              </button>
            </div>
            <div id="tournamentRating">
              {storeData.tournamentPrizes === "{}" || !prizesParse() ? (
                <>
                  <div className="svg__prize_empty"></div>
                </>
              ) : (
                <Tooltip
                  placement="top"
                  overlay={
                    <div className="prizes__tooltip">{prizesParse()}</div>
                  }
                  trigger={["hover"]}
                  mouseLeaveDelay={0}
                  align={alignConfigTop}
                  className="prizes__tooltip"
                >
                  <PrizeIcon className="svg__prize" />
                </Tooltip>
              )}

              <div>
                <span>Рейтинг: </span>
                {storeData.tournamentRate === "0"
                  ? "Без ограничений"
                  : storeData.tournamentRate}
              </div>
              <CalendarIcon className="svg__calendar" onClick={flipForm} />
            </div>

            <div className="line"></div>
          </form>
          <input
            className="drop_input"
            name="chacor"
            type="checkbox"
            id="chacor1"
          />
          <div className="drop_links">
            <div>
              {links.map((link) => {
                return (
                  <a
                    key={link.id}
                    href={link.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.title}
                  </a>
                );
              })}
            </div>
          </div>
          <label className="drop" htmlFor="chacor1">
            Важные ссылки
          </label>
        </div>

        <>
          <MyCalendar flipCard={flipCalendar} />
        </>
      </ReactCardFlip>
    </>
  );
};

export default Form;
