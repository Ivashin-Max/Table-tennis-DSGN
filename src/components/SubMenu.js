import React from 'react'
import { useDispatch } from 'react-redux';
import { setTable } from '../store/reducer';
import { fetchTableData } from '../actions/fetchTableData';
import {ReactComponent as PersonIcon} from '../styles/img/personWhite.svg';
import {ReactComponent as CalendarIcon} from '../styles/img/calendar-svgrepo-com (1).svg';
import { getTournamentDay } from '../actions/date';
import { useSelector } from 'react-redux';

//Подменю хедера, которые мы создаём при ините
const SubMenu = ({ url, tournaments, onPress }) => {
	const [isShown, setIsShown] = React.useState(false);
	const dispatch = useDispatch();


	const onClick = React.useCallback((name) =>async () => {

    setIsShown(true);
		await dispatch(setTable({
			neededDivisionId: url,
			neededTournamentName: name
		}))
		await dispatch(fetchTableData());
    	onPress();
    setIsShown(false);


	}, [dispatch, onPress, url])


	return (
    <>{isShown &&
      <div className="modal"></div>}
		  <ul className="header__navbar_menu_sub">
        
		  	{tournaments.map((tournament) => (
		  		<li 
		  			onClick={onClick(tournament.pageName)}
		  			key={tournament.tournamentName}
		  		>
		  			{tournament.tournamentName} |<CalendarIcon className='person'/> <span>{getTournamentDay(tournament.day)}</span> |  <PersonIcon className='person'/>  {tournament.total}
		  		</li>
		  	))
		  	}
		  </ul >
    </>
	)
}

export default SubMenu
