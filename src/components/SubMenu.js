import React from 'react'
import { useDispatch } from 'react-redux';
import { setCalendarMode, setTable } from '../store/reducer.js';
import { ReactComponent as PersonIcon } from '../styles/img/personWhite.svg';
import { ReactComponent as CalendarIcon } from '../styles/img/calendar-svgrepo-com (1).svg';
import { getTournamentDay, getTournamentDate } from '../actions/date';
import { getParticipants } from '../actions/fetchDB';
import { ReactComponent as GroupIcon } from '../styles/img/group-svgrepo-com.svg';
import { useSearchParams } from 'react-router-dom';

//Подменю хедера, которые мы создаём при ините
const SubMenu = ({ divisionId, tournaments, adminMode }) => {

  const dispatch = useDispatch();

  let [, setSearchParams] = useSearchParams();

  // const newTournamentButton = 0;

  const onClick = React.useCallback((id) => async () => {


    await dispatch(setTable({
      neededDivisionId: divisionId,
      neededTournamentId: id
    }))
    await dispatch(getParticipants(id));

    setSearchParams({ tournament: id, division: divisionId })

    dispatch(setCalendarMode({ calendarMode: false }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, divisionId])


  return (
    <>

      <ul className="header__navbar_menu_sub">

        {tournaments.map((tournament) => (
          <li
            onClick={onClick(tournament.id)}
            key={tournament.id}
          >
            {tournament.tournament_name} | <span>{getTournamentDate(tournament.date_time)}</span> |<CalendarIcon className='person' />
            <span>{getTournamentDay(tournament.date_time)}</span>
            |  {
              !!tournament.team ?
                <>
                  <GroupIcon className='svg__group' />  {tournament.count}
                </>
                :
                <>
                  <PersonIcon className='person' />  {tournament.count}
                </>
            }
          </li>
        ))
        }
        {adminMode && <li onClick={onClick(0)}>+</li>}
      </ul >
    </>
  )
}

export default SubMenu
