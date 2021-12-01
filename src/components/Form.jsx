import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import logo from '../styles/img/ping-pong-svgrepo-com.svg'
import { getSheet } from '../actions/google';
import { fetchTableData } from '../actions/fetchTableData';
import { useDispatch } from 'react-redux';
import { vkAuth } from '../actions/vk'
import { clearStorageId, checkStoragedId, addFioToStorage, getPromptFio } from '../actions/localStorage';

//FIXME:
// Добавить визуальный эффект, после нажатия кнопки Добавить/Удалить, не дублируя весь код

const Form = () => {
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [tellPlaceholder, setTellPlaceholder] = useState('Ваш телефон');
	const [prompt, setPrompt] = useState(false)
	const dispatch = useDispatch();
	const storeData = useSelector(state => state.data)
	const neededTournament = useSelector(state => state.table)
	const [fio, setFio] = useState('');
	const [tell, setTell] = useState('')

	const DATA_STARTS_FROM_CELL = 2;



	React.useEffect(() => {
		let vkId = checkStoragedId();
		console.log(`В локалСторадж хранится id: ${vkId}`);
		if (!!vkId) {
			setDisabled(true);
			setTellPlaceholder('Ввод телефона не требуется')
		}
	}, [])



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
		const vkId = checkStoragedId();

		if (fio === '' || (tell === '' && !vkId)) {
			alert('Введите данные');
			setLoading(false)
		}

		else {
			let neededCell = '';

			const neededSheet = await getSheet(neededTournament.neededDivisionId, neededTournament.neededTournamentName, 'B1:C70');

			if (vkId) neededCell = findParticipant(neededSheet, fio, vkId);
			else neededCell = findParticipant(neededSheet, fio, tell);



			if (neededCell === null) {
				alert(`Такой участник не зарегистрирован`)
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
				setPrompt(false)
				setLoading(false)
			}
		}


		console.groupEnd();
	}



	const newParticipant = async (e) => {
		e.preventDefault();
		const vkId = checkStoragedId();
		if (fio === '' || (tell === '' && !vkId)) {
			alert('Введите данные');
			setLoading(false)
		}
		else {
			setLoading(true)

			const neededSheet = await getSheet(neededTournament.neededDivisionId, neededTournament.neededTournamentName, 'B1:C60');
			const vkId = checkStoragedId();

			console.log(`Хотим добавить челика фио: ${fio}, tell: ${tell} -  в эту таблу`, neededSheet);

			for (let i = DATA_STARTS_FROM_CELL; i < 70; i++) {
				let element = neededSheet.getCellByA1(`B${i}`).value

				if (element === fio) {
					alert('Нельзя! Такой участник уже зарегистрировался');
					setLoading(false)
					break
				}

				if (element === null) {
					neededSheet.getCellByA1(`B${i}`).value = fio;

					if (vkId) neededSheet.getCellByA1(`C${i}`).value = vkId
					else neededSheet.getCellByA1(`C${i}`).value = tell

					await neededSheet.saveUpdatedCells();
					await dispatch(fetchTableData());
					addFioToStorage(fio)
					setPrompt(false)
					setLoading(false)
					break
				}
			}
		}
	}

	const showPrompt = () => {
		setPrompt(true)
	}
	const hidePrompt = () => {
		setPrompt(false)
	}

	const autoComplete = event => {
		setFio(event.target.textContent)
		hidePrompt()
	}


	if (loading) {
		return (
			<span className="loader"></span>
		)
	}

	return (
		<form action="#" id="form" className="form" >
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
				{prompt && <div className="fioPrompt">
					{
						getPromptFio().map((name) => (
							<div
								key={name}
								onMouseDown={autoComplete}
							>
								{name}
							</div>
						))
					}
				</div>}
				<input
					type="text"
					placeholder=' '
					id="newParticipantName"
					autoComplete='off'
					value={fio}
					onChange={event => setFio(event.target.value)}
					onClick={showPrompt}
					onBlur={hidePrompt}
				/>
				<label >Ваше ФИО</label>
			</div>
			<div className="placeholder-container">
				<input
					type="tell"
					placeholder=' '
					id="participantTell"
					autoComplete='off'
					disabled={disabled}
					value={tell}
					onChange={event => setTell(event.target.value)} />
				<label>{tellPlaceholder}</label>
			</div>
			<div className="buttons">
				<button className="buttons_green" onClick={newParticipant}>Записаться на турнир</button>
				<button className="buttons_red" onClick={deleteParticipant}>Удалиться с турнира</button>
				<button className="buttons_green"
					disabled={disabled}
					onClick={vkAuth}>
					{!disabled && <span>Авторизоваться Вконтакте</span>}
					{disabled && <span> Вы авторизованы Вконтакте</span>}
				</button>
				<button
					className="buttons_red"
					onClick={clearStorageId}>
					Выйти из Вконтакте
				</button>
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


