import React, { ReactEventHandler, useEffect, useState } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import star from '../../styles/img/star-svgrepo-com.svg';
import { motion, animate, AnimatePresence } from 'framer-motion/dist/framer-motion';
import { useExactTournaments } from '../../hooks/useAllTournaments';
import { getTournamentDate, getTournamentDay, getTournamentTime } from '../../actions/date';
import { ReactComponent as PersonIcon } from '../../styles/img/personWhite.svg';
import { ReactComponent as CalendarIcon } from '../../styles/img/calendar-svgrepo-com (1).svg';
import { useDispatch } from 'react-redux';
import { getParticipants } from '../../actions/fetchDB';
import { setLoading, setTable } from '../../store/reducer';
import { patchProfile } from '../../actions/Profile/profileRequests';
import EditableTitle from '../Styled/EditableTitle';
import ForwardedInput from '../Styled/EditableTitle';

const ProfileCardAuth = () => {
  const user = useTypedSelector(state => state.auth);
  const allDivisions = useTypedSelector(state => state.divisions).divisions;
  const myTournaments = useExactTournaments(user.tournamentsId)
  const dispatch = useDispatch();
  const lastNameName = user.fio.split(' ')[0] + ' ' + user.fio.split(' ')[1];
  const [telegramId, setTelegramId] = useState('');
  const [rttfId, setRttfId] = useState('');
  const [settings, setSettings] = useState(false)

  const starAnimation = {
    hover: { scale: [1.1, 1.2, 1.1], transition: { repeat: Infinity } },
    tap: { scale: 0.8 }
  };
  const getDivisionName = (divisionId: number) => {

    const neededDivision = allDivisions.find((el: any) => el.id === divisionId)
    console.log(divisionId)
    return neededDivision.division_name
  }

  const onClick = React.useCallback((tournament) => async () => {

    // setIsShown(true);

    await dispatch(setTable({
      neededDivisionId: tournament.division,
      neededTournamentId: tournament.id
    }))

    await dispatch(getParticipants(tournament.id));


  }, [dispatch])

  const validateTlg = () => {
    if (telegramId === '') {
      if (!!user?.userInfo?.telegram_id) {
        return user.userInfo.telegram_id
      }
      else return 0
    }
    else return telegramId

  }

  const validateRttf = () => {
    if (rttfId === '') {
      if (!!user?.userInfo?.rttf_id) {
        return user.userInfo.rttf_id
      }
      else return 0
    }
    else return rttfId
  }

  const handleClick = (e: any) => {
    e.preventDefault();
    const tlg = validateTlg();
    const rttf = validateRttf();
    const newValues = {
      telegram_id: +tlg,
      rttf_id: +rttf
    }
    patchProfile(newValues)
      .then(res => console.log(1111, res))
    console.log('Submit', newValues)
  }





  return (
    <div className='profileCard_Auth'>

      <div className="profileCard__header">
        <div className="profileCard__text">{lastNameName}</div>
        <div className='profileCard__rating'>
          <motion.img
            variants={starAnimation}
            whileHover="hover"
            whileTap="tap"
            className='neTable__star'
            src={star}
            alt="personIcon" />
          <motion.span initial={{}}>{user.rate_value}</motion.span>
        </div>
      </div>
      <div className="profileCard__line"></div>
      {!user.userInfo.telegram_id && <div className="profileCard__telegram">
        <span className="profileCard__text">Telegram</span>
        <input type="number" placeholder='Введите ID'
          value={telegramId}
          onChange={(e) => setTelegramId(e.currentTarget.value)}
        />
      </div>}
      {!user.userInfo.rttf_id && <div className="profileCard__telegram">
        <span className="profileCard__text">RTTF id</span>
        <input type="number" placeholder='Введите ID'
          value={rttfId}
          onChange={(e) => setRttfId(e.currentTarget.value)} />

      </div>}
      {!user.userInfo.rttf_id || !user.userInfo.telegram_id && <div >
        <button onClick={handleClick}> Сохранить</button>
        <div className="profileCard__line"></div>
      </div>}

      <div className="profileCard__tournaments">
        <div className="profileCard__text">Мои турниры</div>
        <ul className="">

          {myTournaments.map((tournament) => (
            <li
              onClick={onClick(tournament)}
              key={tournament.id}
            >
              <div className='profileCard__tornamentRow'>
                <span>{getTournamentDate(tournament.date_time)}</span>
                |<CalendarIcon className='person' /> <span>{getTournamentDay(tournament.date_time)}</span>
                |<span>{getTournamentTime(tournament.date_time)}</span>
                | <PersonIcon className='person' />  {tournament.count}
              </div>
              <div>
                {tournament.tournament_name}
                |{getDivisionName(tournament.division)}
              </div>

            </li>
          ))
          }

        </ul >
      </div>
      {!!user?.userInfo?.play_status_1d &&
        !!user?.userInfo?.play_status_2d &&
        !!user?.userInfo?.play_status_3d &&
        !!user?.userInfo?.play_status_vd && <>

          <div className="profileCard__line"></div>
          <div className="profileCard__rights">
            <div className="profileCard__text">Права на посещение</div>
            {!!user?.userInfo?.play_status_1d && <div> I Дивизон  +</div>}
            {!!user?.userInfo?.play_status_2d && <div> II Дивизон +</div>}
            {!!user?.userInfo?.play_status_3d && <div> III Дивизон   +</div>}
            {!!user?.userInfo?.play_status_vd && <div> Высший дивизон  +</div>}
          </div>
        </>}
      <div className="profileCard__arrow" onClick={() => setSettings(!settings)}>{settings ? '+' : '-'}</div>
      <AnimatePresence>
        {settings &&


          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0, overflow: 'hidden' }}
          >

            {/* <div className="profileCard__telegram">
              <span className="profileCard__text">Telegram</span>
              <span>{telegramId} </span>
              <input type="number" placeholder={user.userInfo.telegram_id}
                value={telegramId}
                onChange={(e) => setTelegramId(e.currentTarget.value)}
              />
            </div> */}
            <div className="profileCard__telegram">
              <ForwardedInput title={user.userInfo.telegram_id} label='Telegram' />

            </div>
            <div className="profileCard__telegram">
              <ForwardedInput title={user.userInfo.rttf_id} label='RTTF' />

            </div>
            {/* <div className="profileCard__telegram">
              <span className="profileCard__text">RTTF id</span>

              <input type="number" placeholder='Введите ID'
                value={rttfId}
                onChange={(e) => setRttfId(e.currentTarget.value)} />

            </div> */}
            <div >
              <button onClick={handleClick}> Сохранить</button>
              <div className="profileCard__line"></div>
            </div>
          </motion.div>


        }
      </AnimatePresence>
    </div>
  )
}

export default ProfileCardAuth