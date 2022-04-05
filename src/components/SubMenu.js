import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setTable } from '../store/reducer.js';
import { fetchParticipants } from '../actions/fetchTableData';
import { ReactComponent as PersonIcon } from '../styles/img/personWhite.svg';
import { ReactComponent as CalendarIcon } from '../styles/img/calendar-svgrepo-com (1).svg';
import { getTournamentDay, getTournamentDate } from '../actions/date';
import { useSelector } from 'react-redux';
import { getParticipants } from '../actions/fetchDB';
import { useTypedSelector } from '../hooks/useTypedSelector';

//Подменю хедера, которые мы создаём при ините
const SubMenu = ({ divisionId, tournaments, onPress, adminMode }) => {
  const [isShown, setIsShown] = React.useState(false);
  const dispatch = useDispatch();

  const newTournamentButton = 0;

  const onClick = React.useCallback((id) => async () => {

    setIsShown(true);

    await dispatch(setTable({
      neededDivisionId: divisionId,
      neededTournamentId: id
    }))
    if (id !== 0) {
      await dispatch(getParticipants(id));
      // console.log('storeTable', storeTable)

    }
    onPress();
    setIsShown(false);


  }, [dispatch, divisionId, onPress])

  // useEffect(() => {
  //   console.log('tournaments', tournaments)
  // }, [])


  return (
    <>{isShown &&
      <div className="modal"></div>}
      <ul className="header__navbar_menu_sub">

        {tournaments.map((tournament) => (
          <li
            onClick={onClick(tournament.id)}
            key={tournament.id}
          >
            {tournament.tournament_name} | <span>{getTournamentDate(tournament.date_time)}</span> |<CalendarIcon className='person' />
            <span>{getTournamentDay(tournament.date_time)}</span>
            |  <PersonIcon className='person' />  {tournament.count}
          </li>
        ))
        }
        {adminMode && <li onClick={onClick(0)}>+</li>}
      </ul >
    </>
  )
}

export default SubMenu
