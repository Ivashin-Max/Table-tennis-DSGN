import React from 'react'
import { useSelector } from 'react-redux';
import logo from '../styles/img/ping-pong-svgrepo-com.svg'
import { useState } from 'react';
import { getSheet } from '../actions/google';
import { fetchTableData } from '../actions/fetchTableData';
import { useDispatch } from 'react-redux';
import { NewParticipant } from '../actions/formActions';


//FIXME:
// Добавить визуальный эффект, после нажатия кнопки Добавить/Удалить, не дублируя весь код

const Form = () => {
	const [loading, setLoading] = React.useState(false);

	const dispatch = useDispatch();
	const storeData = useSelector(state => state.data)
	const neededTournament = useSelector(state => state.table)
	const [fio, setFio] = useState('');
	const [tell, setTell] = useState('')
	const clearInputs = () => {
		setFio('');
		setTell('');
	}
	const DATA_STARTS_FROM_CELL = 2;


	const findParticipant = (sheet, findingFio, findingTell) => {
		let rowNumber = null;

		for (let i = DATA_STARTS_FROM_CELL; i < 70; i++) {
			let element = sheet.getCellByA1(`B${i}`).value

			if (element === findingFio) {
				let tell = sheet.getCellByA1(`C${i}`).value

				if (tell.toString() === findingTell) {
					rowNumber = i
					break
				}
			}
		}
		return rowNumber
	}


	const deleteParticipant = async (e) => {
		e.preventDefault();
		setLoading(true)
		const neededSheet = await getSheet(neededTournament.neededDivisionId, neededTournament.neededTournamentName, 'B1:C70');
		console.groupCollapsed('Отработка функции удаления участника')
		console.log(`Хотим удалить челика фио: ${fio}, tell: ${tell} -  в этой табле`, neededSheet);
		if (!fio || !tell) {
			alert('Введите данные');
			setLoading(false)
		}

		else {
			const neededCell = findParticipant(neededSheet, fio, tell);

			if (neededCell === null) {
				alert(`Такого участника не существует`)
				setLoading(false)
			}
			else {
				console.log(`Нашли cовпадение по имени:${fio} и телефону ${tell} в строке №${neededCell}`);
				neededSheet.getCellByA1(`B${neededCell}`).value = null;
				neededSheet.getCellByA1(`C${neededCell}`).value = null;
				await neededSheet.saveUpdatedCells()
				await neededSheet.loadCells();
				//FIXME:
				// ДЕСТРУКТУРИЗАЦИЯ,мы взяли именно 3й элемент массива,пздец, переделывать

				const nonEmpty = neededSheet._cells.filter(([, , cell]) => !!cell.value).map(([, , cell]) => cell.value)
				const nonEmpty1 = neededSheet._cells.filter(([, q,]) => !!q.value).map(([, q,]) => q.value);
				let i = 0;
				let j = 0
				neededSheet._cells.forEach(([, , cell], index) => {
					const cellS = neededSheet.getCell(cell._row, cell._column);
					cellS.value = nonEmpty[i];
					i++;
				});

				neededSheet._cells.forEach(([, q,], index) => {
					const cellS = neededSheet.getCell(q._row, q._column);
					cellS.value = nonEmpty1[j];
					j++;
				});



				await neededSheet.saveUpdatedCells()
				await dispatch(fetchTableData())
				setLoading(false)
			}
		}


		console.groupEnd();
	}


	const newParticipant = async (e) => {
		e.preventDefault();
		setLoading(true)
		const neededSheet = await getSheet(neededTournament.neededDivisionId, neededTournament.neededTournamentName, 'B1:C60');
		console.log(`Хотим добавить челика фио: ${fio}, tell: ${tell} -  в эту таблу`, neededSheet);

		for (let i = DATA_STARTS_FROM_CELL; i < 70; i++) {
			let element = neededSheet.getCellByA1(`B${i}`).value

			if (element === fio) {
				alert('Нельзя! Такой челик уже зарегался');
				setLoading(false)
				break
			}

			if (element === null) {
				neededSheet.getCellByA1(`B${i}`).value = fio;
				neededSheet.getCellByA1(`C${i}`).value = tell;
				await neededSheet.saveUpdatedCells();
				await dispatch(fetchTableData());
				// clearInputs();
				setLoading(false)
				break
			}
		}

	}


	if (loading) {
		return (
			<span className="loader"></span>
		)
	}

	return (
		<form action="#" id="form" className="form">
			<section className="form_header">
				<p id="tournamentAdress">
					{storeData.tournamentPlace}
				</p>
				<p id="tournamentTell">
					{storeData.tournamentTell}
				</p>
				<img src={logo} alt="red rocket" className="logo" />
			</section>
			<div className="placeholder-container">
				<input type="text" placeholder=' ' id="newParticipantName" value={fio} onChange={event => setFio(event.target.value)} />
				<label>Ваше ФИО</label>
			</div>
			<div className="placeholder-container">
				<input type="tel" placeholder=' ' id="participantTell" value={tell} onChange={event => setTell(event.target.value)} />
				<label>Ваш телефон</label>
			</div>
			<div className="buttons">
				<button className="buttons_green" onClick={newParticipant}>Записаться на турнир</button>
				<button className="buttons_red" onClick={deleteParticipant}>Удалиться с турнира</button>
			</div>
			<p id="tournamentRating">
				{storeData.tournamentRate}
			</p>

			<div className="acor-container">
				<input name='chacor' type="checkbox" id="chacor1" />
				<label htmlFor="chacor1">Важные ссылки</label>
				<div className="acor-body">
					<p>Тут будут ссылки</p>
				</div>
			</div>

		</form>
	)
}



export default Form


