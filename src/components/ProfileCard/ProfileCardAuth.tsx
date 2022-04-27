import React, { ReactEventHandler, useEffect, useRef, useState } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import star from '../../styles/img/star-svgrepo-com.svg';
import { motion, animate, AnimatePresence } from 'framer-motion/dist/framer-motion';
import { useExactTournaments } from '../../hooks/useAllTournaments';
import { getTournamentDate, getTournamentDay, getTournamentTime } from '../../actions/date';
import { ReactComponent as PersonIcon } from '../../styles/img/personWhite.svg';
import { ReactComponent as CalendarIcon } from '../../styles/img/calendar-svgrepo-com (1).svg';
import { ReactComponent as StarIcon } from '../../styles/img/star-svgrepo-com.svg';
import { useDispatch } from 'react-redux';
import { getParticipants } from '../../actions/fetchDB';
import { setLoading, setTable } from '../../store/reducer';
import { patchProfile } from '../../actions/Profile/profileRequests';
import EditableTitle from '../Styled/EditableTitle';
import ForwardedInput from '../Styled/EditableTitle';
import Button from '../Styled/Button';
import EditableInput from './ProfileCardEditableInput';
import { getDivisionName } from '../../actions/divisions';

const ProfileCardAuth = () => {
  const user = useTypedSelector(state => state.auth);
  const allDivisions = useTypedSelector(state => state.divisions).divisions;
  const myTournaments = useExactTournaments(user.tournamentsId)
  const dispatch = useDispatch();

  const lastName = user.fio.split(' ')[0]
  const name = user.fio.split(' ')[1];

  const lastNameName = lastName + ' ' + (name ? name : '');
  const [telegramId, setTelegramId] = useState('');
  const [rttfId, setRttfId] = useState('');
  const [settings, setSettings] = useState(false);
  const [telegramState, setTelegrammState] = useState(true)
  const [rttfState, setRttfState] = useState(true)

  const starAnimation = {
    hover: { scale: [1.1, 1.2, 1.1], transition: { repeat: Infinity } },
    tap: { scale: 0.8 }
  };


  const onClick = React.useCallback((tournament) => async () => {

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

  useEffect(() => {
    console.log(!!user.userInfo.telegram_id)
    if (!!user.userInfo.rttf_id) setRttfState(false)
    if (!!user.userInfo.telegram_id) setTelegrammState(false)
  }, [])


  const handleSettings = () => {

    setRttfState(!user.userInfo.rttf_id ? true : !settings)
    setTelegrammState(!user.userInfo.telegram_id ? true : !settings)
    setSettings(prev => !prev)
  }


  return (
    <div className='profileCard_Auth'>

      <div className="profileCard__header">
        <div className="profileCard__text">{lastNameName}</div>
        <div className='profileCard__rating'>
          <StarIcon className='svg__star_red svg__star' />
          <motion.span initial={{}}>{user.rate_value}</motion.span>
        </div>
      </div>
      <div className="profileCard__line"></div>
      {telegramState && <>
        {user.userInfo.telegram_id ?
          <>
            <div className="profileCard__telegram">
              <EditableInput title='telegram' id={user.userInfo.telegram_id} user={user.userInfo} />
            </div>
          </> :
          <>
            <div className="profileCard__telegram">
              <EditableInput editable title='telegram' id={user.userInfo.telegram_id} user={user.userInfo} />
            </div>
          </>
        }
      </>}

      {rttfState && <>
        {user.userInfo.rttf_id ?
          <>
            <div className="profileCard__telegram">
              <EditableInput title='rttf' id={user.userInfo.rttf_id} user={user.userInfo} />
            </div>
          </>
          :
          <>
            <div className="profileCard__telegram">
              <EditableInput editable title='rttf' id={user.userInfo.rttf_id} user={user.userInfo} />
            </div>
          </>
        }
      </>
      }
      {/* 
      {(rttfState || telegramState) &&
        <div >
          <Button onClick={handleClick} small>Сохранить </Button>
          <div className="profileCard__line"></div>
        </div>
      } */}

      <div className="profileCard__tournaments">
        <div className="profileCard__text">Мои турниры</div>
        <ul>

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
                |{getDivisionName(tournament.division, allDivisions)}
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
      <div className="profileCard__arrow" onClick={handleSettings}>{settings ? '+' : '-'}</div>

    </div>
  )
}

export default ProfileCardAuth