import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import { useExactTournaments } from "../../hooks/useAllTournaments";
import {
  getTournamentDate,
  getTournamentDay,
  getTournamentTime,
} from "../../actions/date";
import { ReactComponent as PersonIcon } from "../../styles/img/personWhite.svg";
import { ReactComponent as CalendarIcon } from "../../styles/img/calendar-svgrepo-com (1).svg";
import { ReactComponent as SettingsIcon } from "../../styles/img/fast-forward-svgrepo-com.svg";
import { ReactComponent as StarIcon } from "../../styles/img/star-svgrepo-com.svg";
import { useDispatch } from "react-redux";
import { getParticipants } from "../../actions/fetchDB";
import { setCalendarMode, setTable } from "../../store/reducer";
import EditableInput from "./ProfileCardEditableInput";
import EditableSelect from "./ProfileCardEditableSelect";
import categoryOptions from "../../static/categoryOptions.json";

const ProfileCardAuth = () => {
  const user = useTypedSelector((state) => state.auth);
  const myTournaments = useExactTournaments(user.tournamentsId);
  const dispatch = useDispatch();
  const rights =
    !!user?.userInfo?.play_status_1d ||
    !!user?.userInfo?.play_status_2d ||
    !!user?.userInfo?.play_status_3d ||
    !!user?.userInfo?.play_status_vd;
  const lastName = user.fio.split(" ")[0];
  const name = user.fio.split(" ")[1];

  const lastNameName = lastName + " " + (name ? name : "");

  const [settings, setSettings] = useState(false);
  const [telegramState, setTelegrammState] = useState(true);
  const [rttfState, setRttfState] = useState(true);

  const settingsAnimation = {
    initial: { height: 0, opacity: 0 },
    animate: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
  };

  const onClick = React.useCallback(
    (tournament) => async () => {
      await dispatch(
        setTable({
          neededDivisionId: tournament.division,
          neededTournamentId: tournament.id,
          neededZone: tournament.zone,
        })
      );

      await dispatch(setCalendarMode({ calendarMode: false }));

      await dispatch(
        getParticipants(
          tournament.city,
          tournament.zone,
          tournament.division,
          tournament.id
        )
      );
    },
    [dispatch]
  );

  useEffect(() => {
    if (!!user.userInfo.rttf_id) setRttfState(false);
    if (!!user.userInfo.telegram_id) setTelegrammState(false);
  }, []);

  const handleSettings = () => {
    setRttfState(!user.userInfo.rttf_id ? true : !settings);
    setTelegrammState(!user.userInfo.telegram_id ? true : !settings);

    setSettings((prev) => !prev);
  };

  return (
    <div className="profileCard_Auth">
      <div className="profileCard__header">
        <div className="profileCard__text">{lastNameName}</div>
        <div className="profileCard__rating profileCard__text">
          <StarIcon className="svg__star_red svg__star" />
          <span>{user.rate_value}</span>
        </div>
      </div>
      <div className="profileCard__line"></div>
      <div className="overflow">
        <AnimatePresence>
          {telegramState && (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={settingsAnimation}
            >
              <div className="profileCard__telegram">
                <EditableInput
                  inputName="telegram_id"
                  editable={user.userInfo.telegram_id ? false : true}
                  title="telegram"
                  id={user.userInfo.telegram_id}
                  user={user.userInfo}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {rttfState && (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={settingsAnimation}
            >
              <div className="profileCard__telegram">
                <EditableInput
                  inputName="rttf_id"
                  editable={user.userInfo.rttf_id ? false : true}
                  title="rttf"
                  id={user.userInfo.rttf_id}
                  user={user.userInfo}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={settingsAnimation}
          >
            <div className="profileCard__telegram">
              <EditableSelect
                inputName="category"
                editable={user.userInfo.category ? false : true}
                title="Разряд"
                fixedOptions={categoryOptions.options}
                id={user.userInfo.category}
                user={user.userInfo}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={settingsAnimation}
          >
            <div className="profileCard__telegram">
              <EditableSelect
                inputName="coach"
                editable={user.userInfo.coach ? false : true}
                title="Тренер"
                id={user.userInfo.coach}
                user={user.userInfo}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="profileCard__tournaments">
        <div className="profileCard__text">Мои турниры</div>
        <ul>
          {myTournaments.map((tournament) => (
            <li key={tournament.id}>
              <div onClick={onClick(tournament)}>
                <div className="profileCard__tornamentRow">
                  <span>{getTournamentDate(tournament.date_time)}</span>
                  |<CalendarIcon className="person" />{" "}
                  <span>{getTournamentDay(tournament.date_time)}</span>|
                  <span>{getTournamentTime(tournament.date_time)}</span>
                  | <PersonIcon className="person" /> {tournament.count}
                </div>
                <div>{tournament.tournament_name}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {rights && (
        <>
          <div className="profileCard__line"></div>
          <div className="profileCard__rights">
            <div className="profileCard__text">Права на посещение</div>
            {!!user?.userInfo?.play_status_1d && (
              <div className="profileCard__division">
                <div> I Дивизон</div>{" "}
                <div className="profileCard__square"></div>
              </div>
            )}
            {!!user?.userInfo?.play_status_2d && (
              <div className="profileCard__division">
                <div>II Дивизон</div>{" "}
                <div className="profileCard__square"></div>
              </div>
            )}
            {!!user?.userInfo?.play_status_3d && (
              <div className="profileCard__division">
                <div>III Дивизон</div>{" "}
                <div className="profileCard__square"></div>
              </div>
            )}
            {!!user?.userInfo?.play_status_vd && (
              <div className="profileCard__division">
                <div>Высший дивизон</div>{" "}
                <div className="profileCard__square"></div>
              </div>
            )}
          </div>
        </>
      )}
      <div className="profileCard__arrow" onClick={handleSettings}>
        {settings ? (
          <SettingsIcon className="svg__settingsArrows svg__settingsArrows_bottom" />
        ) : (
          <SettingsIcon className="svg__settingsArrows svg__settingsArrows_up" />
        )}
      </div>
    </div>
  );
};

export default ProfileCardAuth;
