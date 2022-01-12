import React from 'react'
import { getSheetsNames } from '../actions/google'
import { useDispatch } from 'react-redux';
import { setTable } from '../store/reducer';
import { fetchTableData } from '../actions/fetchTableData';




//Подменю хедера, которые мы создаём при ините
const SubMenu = ({ id, onPress }) => {
	const [isShown, setIsShown] = React.useState(false);
	const dispatch = useDispatch();
	const [tournamentsNames, setTournamentsNames] = React.useState();


	React.useEffect(() => {
		async function fetchData() {
			const tournamentsNames = await getSheetsNames(id);
			setTournamentsNames(tournamentsNames);
		}
		fetchData()
	}, [id])


	const onClick = React.useCallback((name) =>async () => {
    setIsShown(true);
		await dispatch(setTable({
			neededDivisionId: id,
			neededTournamentName: name
		}))
		await dispatch(fetchTableData());
    	onPress();
    setIsShown(false);
	}, [id, dispatch, onPress])


	return (
    <>{isShown &&
      <div className="modal"></div>}
		  <ul className="header__navbar_menu_sub">
		  	{tournamentsNames?.map((name) => (
		  		<li
		  			onClick={onClick(name)}
		  			key={name}
		  		>
		  			{name}
		  		</li>
		  	))
		  	}
		  </ul >
    </>
	)
}

export default SubMenu
