import React from 'react';
import { useSelector } from 'react-redux';



const Table = () => {

	const selector = useSelector(state => state.data)
	const currentTournament = useSelector(state => state.table.neededTournamentName)
	console.log(`Данные по турниру ${currentTournament}`, selector);

	//при обновлении стора у нас обновится компонент 
	return (
		<div id="neTable" className='neTable'>
			<div className="neTable__header_name">
				{selector.tableDivisionName}
			</div>
			<div className="neTable__header_date">
				<div>	{selector.tableDate}</div>
				<div>	{selector.tableTime}</div>
			</div>
			<div className="neTable__main" >
				{selector.tableFio?.map((name) => (
					<div className='neTable__row' key={name + currentTournament} >
						<div className="neTable__row_square" ></div>
						<div className="neTable__row_fio" >{name} </div>
						<span className="neTable__row_tooltip">{name}</span>
					</div>
				))
				}
			</div>
			<div className="neTable__total">
				{`Total ${selector.tableFio.length}/${selector.tableTotal}`}
			</div>
			<p>Запас</p>
			<div id="neTable__total" className="neTable__zapas">
				{selector.tableZapas?.map((name) => (
					<div className='neTable__row' key={name + currentTournament}>
						<div className="neTable__row_square"></div>
						<div className="neTable__row_fio" >{name} </div>
						<span className="neTable__row_tooltip">{name}</span>
					</div>
				))
				}
			</div>
		</div>
	)
};

export default Table

