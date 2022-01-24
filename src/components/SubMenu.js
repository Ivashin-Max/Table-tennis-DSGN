import React from 'react'
import { useDispatch } from 'react-redux';
import { setTable } from '../store/reducer';
import { fetchTableData } from '../actions/fetchTableData';
import person from '../styles/img/personWhite.svg'
import { getTournamentDay } from '../actions/date';
import { useSelector } from 'react-redux';

//Подменю хедера, которые мы создаём при ините
const SubMenu = ({ url, tournaments, onPress }) => {
	const [isShown, setIsShown] = React.useState(false);
	const dispatch = useDispatch();
  const storeData = useSelector(state => state.data.tableDate)


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
		  			{tournament.tournamentName} | <span>{getTournamentDay(tournament.day)}</span> | <object className='person' type="image/svg+xml" data={person}> person</object> {tournament.total}
		  		</li>
		  	))
		  	}
		  </ul >
    </>
	)
}

export default SubMenu
