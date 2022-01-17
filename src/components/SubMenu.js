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
			await getSheetsNames(id)
      .then((r) => {
        setTournamentsNames(r);
       // console.log('response', r)
      })
      .catch((r)=>{
        let error = r;
        if(error.toString().includes("[429]")){
          console.log(
            'Ошибка 429, превышено кол-во запросов к гугл-таблице(лимиты: "https://developers.google.com/sheets/api/reference/limits")',r)
         }
      });
			
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
