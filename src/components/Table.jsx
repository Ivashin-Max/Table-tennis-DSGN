import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import TableFio from './TableFio'

const Table = () => {
	const [show, setShow] = useState(false);
	const selector = useSelector(state => state.data)
	const currentTournament = useSelector(state => state.table.neededTournamentName)
	console.log(`Данные по турниру ${currentTournament}`, selector);

	// const showTooltip = () => {
	// 	setShow(true)
	// }

	// const hideTooltip = () => {
	// 	setShow(false)
	// }
	//при обновлении стора у нас обновится компонент 
	return (
		<div id="neTable" className='neTable'>
			<div className="neTable__header_head">
				<div className="neTable__header_name">
					{selector.tableDivisionName}
				</div>
				<div className="neTable__header_date">
					<div>	{selector.tableDate}</div>
					<div>	{selector.tableTime}</div>
				</div>
			</div>
			<div className="neTable__header_line"></div>

			<div className="neTable__main" >
				{selector.tableFio?.map((name) => (
					<TableFio name={name} currentTournament={currentTournament} />
				))
				}
			</div>
			<div className="neTable__total">
				{`Total ${selector.tableFio.length}/${selector.tableTotal}`}
			</div>
			<p>Запас</p>
			<div id="neTable__total" className="neTable__zapas">
				{selector.tableZapas?.map((name) => (
					<div className='neTable__row zapas' key={name + currentTournament}>
						<div className="neTable__row_square"></div>
						<div className="neTable__row_fio" >{name} </div>

					</div>
				))
				}
			</div>
		</div>
	)
};

export default Table

