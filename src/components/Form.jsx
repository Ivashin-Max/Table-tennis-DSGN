import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import logoPingPong from '../styles/img/ping-pong.svg'
import logoVk from '../styles/img/VK_Compact_Logo.svg'

import logoPingPongLoader from '../styles/img/ping-pong-loader.svg'

import logoVkBlack from '../styles/img/VK_Compact_Logo_Black.svg'
import { getSheet } from '../actions/google';
import { fetchTableData } from '../actions/fetchTableData';
import { useDispatch } from 'react-redux';
import { clearStorage, checkStoragedId, addFioToStorage, getPromptFio, setId } from '../actions/localStorage';
import InputMask from 'react-input-mask';

//FIXME:
// Добавить визуальный эффект, после нажатия кнопки Добавить/Удалить, не дублируя весь код



const Form = () => {
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [prompt, setPrompt] = useState(false)
	const dispatch = useDispatch();
	const storeData = useSelector(state => state.data)
	const neededTournament = useSelector(state => state.table)
	const [fio, setFio] = useState('');
	const [tell, setTell] = useState('')
  const [modal, setModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
	const DATA_STARTS_FROM_CELL = 2;



	React.useEffect(() => {
		let vkId = checkStoragedId();
		console.log(`В локалСторадж хранится id: ${vkId}`);
		if (!!vkId) {
			setDisabled(true);
		}
	}, [])



	const findParticipant = (sheet, findingFio, findingTell) => {
		// let rowNumber = null;
    let participant = {
      name: false,
      tell: false,
      rowNumber: null
    }
		for (let i = DATA_STARTS_FROM_CELL; i < 70; i++) {
      if (sheet.getCellByA1(`B${i}`).value !== null){
			let element = sheet.getCellByA1(`B${i}`).value.trim().toLocaleLowerCase();

			  if (element === findingFio) {
          participant.name = true
			  	let tell = sheet.getCellByA1(`C${i}`).value.trim()

			  	if (tell.toString() === findingTell) {
            participant.tell = true;
            participant.rowNumber = i
			  		break
			  	}
			  }
      }
		}
    console.log(`Participant`, participant);
		return participant
	}


	const deleteParticipant = async (e) => {
		e.preventDefault();
		setLoading(true)
		const vkId = checkStoragedId();

		if (fio.trim() === '' ) {
			showModalMsg('Введите ФИО');
			setLoading(false)
		}
    else if(tell.length !==17 && !vkId){
      showModalMsg('Введите телефон в корректном формате');
			setLoading(false)
    }

		else {
			let neededCell = '';

			const neededSheet = await getSheet(neededTournament.neededDivisionId, neededTournament.neededTournamentName, 'B1:C70');

			if (vkId) neededCell = findParticipant(neededSheet, fio.trim().toLocaleLowerCase(), vkId);
			else neededCell = findParticipant(neededSheet, fio.trim().toLocaleLowerCase(), tell);



			if (neededCell.name === false) {
				showModalMsg(`Участник с таким именем не зарегистрирован`)
				setLoading(false)
			}
      else if (neededCell.tell === false){
        showModalMsg(`Участник с таким именем зарегистрирован под другим номером телефона`)
				setLoading(false)
      }
			else {
				console.log(`Нашли cовпадение по имени:${fio} и телефону ${tell} в строке №${neededCell.rowNumber}`);

				neededSheet.getCellByA1(`B${neededCell.rowNumber}`).value = null;
				neededSheet.getCellByA1(`C${neededCell.rowNumber}`).value = undefined;
        console.log('1', neededSheet._cells);
				await neededSheet.saveUpdatedCells()

				//FIXME:
				// ДЕСТРУКТУРИЗАЦИЯ,мы взяли именно 3й элемент массива,пздец, переделывать

				const nonEmpty = neededSheet._cells.filter(([, , cell]) => !!cell.value).map(([, , cell]) => cell.value)
				const nonEmpty1 = neededSheet._cells.filter(([, q,]) => !!q.value).map(([, q,]) => q.value);
        console.log(nonEmpty1);
				let i = 0;
				let j = 0
				neededSheet._cells.forEach(([, , cell]) => {
					const cellS = neededSheet.getCell(cell._row, cell._column);
					cellS.value = nonEmpty[i];
					i++;
				});

				neededSheet._cells.forEach(([, q,]) => {
					const cellS = neededSheet.getCell(q._row, q._column);
					cellS.value = nonEmpty1[j];
					j++;
				});



				await neededSheet.saveUpdatedCells()
				await dispatch(fetchTableData(neededSheet));
        if (vkId) neededCell = findParticipant(neededSheet, fio.trim().toLocaleLowerCase(), vkId).rowNumber;
        else neededCell = findParticipant(neededSheet, fio.trim().toLocaleLowerCase(), tell).rowNumber;
        if (neededCell === null) {
          showModalMsg(`Удаление прошло успешно`);

        }
				setPrompt(false)
				setLoading(false)
			}
		}


		console.groupEnd();
	}



	const newParticipant = async (e) => {
		e.preventDefault();
		const vkId = checkStoragedId();
    const newFio = fio;
    // console.log(newFio);
		if (fio.trim() === '') {
      showModalMsg('Для добавления участника необходимо ввести ФИО');
			setLoading(false)
		}
    else if(tell.trim().length !== 17 && !vkId){
      showModalMsg('Для добавления участника необходимо ввести корректный формат номера или авторизоваться Вконтакте');
			setLoading(false)
    }
		else {
      // console.log(tell.trim(), tell.trim().length);
			setLoading(true)

			const neededSheet = await getSheet(neededTournament.neededDivisionId, neededTournament.neededTournamentName, 'B1:C60');
			const vkId = checkStoragedId();

			console.log(`Хотим добавить челика фио: ${fio}, tell: ${tell} -  в эту таблу`, neededSheet);

			for (let i = DATA_STARTS_FROM_CELL; i < 70; i++) {
				let element = neededSheet.getCellByA1(`B${i}`).value
        if (element){
				  if (element.trim().toLocaleLowerCase() === fio.trim().toLocaleLowerCase() ) {
				  	showModalMsg('Нельзя! Такой участник уже зарегистрировался');
				  	setLoading(false)
				  	break
				  }
        }

				if (element === null) {
					neededSheet.getCellByA1(`B${i}`).value = fio;

					if (vkId) neededSheet.getCellByA1(`C${i}`).value = vkId
					else neededSheet.getCellByA1(`C${i}`).value = tell

					await neededSheet.saveUpdatedCells();
					await dispatch(fetchTableData());
					addFioToStorage(fio)
          const fios = storeData
          console.log('stor', fios);
					setPrompt(false)
					setLoading(false)
          
					break
				}
			}
		}
	}
  const closeModalMsg = ()=>{
    setModal(false)
  }

  const showModalMsg = (msg)=>{
    setModalMsg(msg)
    setModal(true)
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

  const successAuth = function(id){
    setId(id);
    setDisabled(true);
    setLoading(false);
  }
  const auth = (e) => {
    e.preventDefault();
    setLoading(true)


    const fetchVk =  () => {
      // eslint-disable-next-line no-undef
        VK.Auth.login((r) => {

          console.log('Ответ от вк авторизации', r);
          if (r.session) {
            successAuth(r.session.mid)
          } else {
            showModalMsg("Ошибка авторизации");
            setLoading(false);
          }
        })
      };
     fetchVk();
	}

  const noAuth = (e)=>{
    e.preventDefault();
    setLoading(true)
		clearStorage();
		setDisabled(false);
    setLoading(false);
  }

	if (loading) {
		return (
      <form action="#" id="form" className="form" >
                <object className='loader_rocket_big' type="image/svg+xml" data={logoPingPongLoader}>svg-animation</object>
      </form>

		)
	}



	return (
  <>
    {modal && <div className="modal_msg">
      <div onClick={closeModalMsg} className="modal_msg_close">&times;</div>
      <div className="modal_msg_text">{modalMsg}</div>
    </div>}

		<form action="#" id="form" className="form" >
			<section className="form_header">
         {disabled && <div 
                        onClick={noAuth}
                        className="form_header_vk">
                          <img className="form_header_img left" src={logoVkBlack} alt="vk Logo"  />
                          <span  className="span black">Выйти</span>
                        </div>
          }
          {!disabled && <div 
                        onClick={auth}
                        className="form_header_vk">
                          <img className="form_header_img left" src={logoVk} alt="vk Logo"  />
                          <span  className="span">Войти</span>
                        </div>}
        <div>
				  <p id="tournamentAdress">
				  	{storeData.tournamentPlace}
				  </p>
				  <p id="tournamentTell">
				  	{storeData.tournamentTell}
				  </p>
        </div>
				<img className="form_header_img right" src={logoPingPong} alt="red rocket"  />
			</section>

      <div className="inputs">
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
		      {!disabled &&	<div className="placeholder-container">
            <InputMask  
              mask="+7\(999)-999-99-99"
              maskChar=""
              id="participantTell"
	            autoComplete='off'
              placeholder=' '
              value={tell}
              onChange={event => setTell(event.target.value)} 
             />
		        <label>Ваш телефон</label>
		      </div>}
      </div>
			<div className="buttons">
				<button className="buttons_green" onClick={newParticipant}>Записаться на турнир</button>
				<button className="buttons_red" onClick={deleteParticipant}>Удалиться с турнира</button>
			</div>
			<p id="tournamentRating">
				{storeData.tournamentRate}
			</p>

      <div className="line"></div>
			<div className="acor-container">
				<input name='chacor' type="checkbox" id="chacor1" />
				<label htmlFor="chacor1">Важные ссылки</label>
				<div className="acor-body">
					<p>Тут будут ссылки</p>
				</div>
			</div>

		</form>
 </>
	)
}



export default Form



