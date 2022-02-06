import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import logoPingPong from '../styles/img/ping-pong.svg'
import logoVk from '../styles/img/VK_Compact_Logo.svg'

import logoPingPongLoader from '../styles/img/ping-pong-loader.svg'
import person from '../styles/img/personBlue.svg'
import logoVkBlack from '../styles/img/VK_Compact_Logo_Black.svg'
import { getSheet } from '../actions/google';
import { fetchTableData } from '../actions/fetchTableData';
import { useDispatch } from 'react-redux';
import { removeStorageItem, checkStoragedId, addFioToStorage, getPromptFio, getPromptTell, setId, addTellToStorage } from '../actions/localStorage';
import InputMask from 'react-input-mask';
import Tooltip from 'rc-tooltip';

import { ReactComponent as ClearStorageIcon } from '../styles/img/x-svgrepo-com.svg';
import classNames from 'classnames';



const alignConfig = {
  // the offset sourceNode by 10px in x and 20px in y,
  targetOffset: ['60%', '-200%'], // the offset targetNode by 30% of targetNode width in x and 40% of targetNode height in y,
  overflow: { adjustX: true, adjustY: true }, // auto adjust position when sourceNode is overflowed
};



//FIXME:
// Добавить визуальный эффект, после нажатия кнопки Добавить/Удалить, не дублируя весь код



const Form = () => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [promptFio, setpromptFio] = useState(false)
  const [promptTell, setpromptTell] = useState(false)
  const dispatch = useDispatch();
  const storeData = useSelector(state => state.data)
  const storeDate = useSelector(state => state.date)
  const links = useSelector(state => state.test.links)
  const neededTournament = useSelector(state => state.table)
  const [fio, setFio] = useState('');
  const [tell, setTell] = useState('')
  const [modal, setModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const DATA_STARTS_FROM_CELL = 2;

  let classNameGreen = classNames({
    "buttons_disabled": storeDate.isLate,
    "buttons_green": !storeDate.isLate
  });
  let classNameRed = classNames({
    "buttons_disabled": storeDate.isLate,
    "buttons_red": !storeDate.isLate
  });


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
      if (sheet.getCellByA1(`B${i}`).value !== null) {
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

    if (fio.trim() === '') {
      showModalMsg('Введите ФИО');
      setLoading(false)
    }
    else if (tell.length !== 17 && !vkId) {
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
      else if (neededCell.tell === false) {
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
        setpromptFio(false)
        setpromptTell(false)
        setLoading(false)
      }
    }


    console.groupEnd();
  }



  const newParticipant = async (e) => {
    e.preventDefault();
    const vkId = checkStoragedId();
    const newFio = fio;
    if (fio.trim() === '') {
      showModalMsg('Для добавления участника необходимо ввести ФИО');
      setLoading(false)
    }
    else if (tell.trim().length !== 17 && !vkId) {
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
        if (element) {
          if (element.trim().toLocaleLowerCase() === fio.trim().toLocaleLowerCase()) {
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
          const fioArr = await dispatch(fetchTableData());
          console.log(fioArr.includes(newFio));

          if (fioArr.includes(newFio)) showModalMsg("Участник добавлен успешно")
          else showModalMsg("Ошибка добавления! Попробуйте ещё раз");

          addFioToStorage(fio);
          addTellToStorage(tell);
          setpromptFio(false)
          setpromptTell(false)
          setLoading(false)

          break
        }
      }
    }
  }
  const closeModalMsg = () => {
    setModal(false)
  }

  const showModalMsg = (msg) => {
    setModalMsg(msg)
    setModal(true)
  }

  const showpromptFio = () => {
    setpromptFio(true)
  }
  const hidepromptFio = () => {
    setpromptFio(false)
  }
  const showpromptTell = () => {
    setpromptTell(true)
  }
  const hidepromptTell = () => {
    setpromptTell(false)
  }

  const autoCompleteFio = event => {
    setFio(event.target.textContent)
    hidepromptFio()
  }
  const autoCompleteTell = event => {
    setTell(event.target.textContent)
    hidepromptTell()
  }

  const successAuth = function (id) {
    setId(id);
    setDisabled(true);
    setLoading(false);
  }
  const auth = (e) => {
    e.preventDefault();
    setLoading(true)


    const fetchVk = () => {
      // eslint-disable-next-line no-undef
      VK.Auth.login((r) => {

        console.log('Ответ от вк авторизации', r);
        if (r.session) {
          successAuth(r.session.mid)
        } else {
          showModalMsg("Ошибка авторизации");
          console.log("Ошибка авторизации ВК", r);
          setLoading(false);
        }
      })
    };
    fetchVk();
  }

  const noAuth = (e) => {
    e.preventDefault();
    setLoading(true)
    removeStorageItem('vkId')
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
      <a className="plus radius" href="#form"> </a>
      <div className="form_wrap">
        <form action="#" id="form" className="form" >
          <section className="form_header">
            {disabled && <div
              onClick={noAuth}
              className="form_header_vk">
              <img className="form_header_img left" src={logoVkBlack} alt="vk Logo" />
              <span className="span black">Выйти</span>
            </div>
            }
            {!disabled && <div
              onClick={auth}
              className="form_header_vk">
              <img className="form_header_img left" src={logoVk} alt="vk Logo" />
              <span className="span">Войти</span>
            </div>}
            <div>
              <p id="tournamentAdress">
                {storeData.tournamentPlace}
              </p>
              <Tooltip placement="right"
                overlay={
                  <div className='org_tooltip'>

                    <span className='org_tooltip_fio'>
                      {storeData.tournamentOrgFio}
                    </span>
                  </div>
                }
                trigger={['hover']}
                mouseLeaveDelay={0}
                align={alignConfig}
              >
                <p id="tournamentTell">
                  {storeData.tournamentTell}
                  <img className='person' src={person} alt="personIcon" />
                </p>
              </Tooltip>

            </div>
            <img className="form_header_img right" src={logoPingPong} alt="red rocket" />
          </section>

          <div className="inputs">
            <div className="placeholder-container">
              <div onMouseDown={() => { removeStorageItem("fio"); removeStorageItem("tell") }} className="clearStorage">
                <ClearStorageIcon className='clearStorage_icon' title='Очистить историю' />

              </div>
              {promptFio && <div className="fioPrompt">
                {
                  getPromptFio().map((name) => (
                    <div
                      key={name}
                      onMouseDown={autoCompleteFio}
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
                onClick={showpromptFio}
                onBlur={hidepromptFio}
              />
              <label >Ваше ФИО</label>
            </div>
            {!disabled &&
              <div className="placeholder-container">

                {promptTell && <div className="fioPrompt">
                  {
                    getPromptTell().map((name) => (
                      <div
                        key={name}
                        onMouseDown={autoCompleteTell}
                      >
                        {name}
                      </div>
                    ))
                  }
                </div>}
                <InputMask
                  mask="+7\(999)-999-99-99"
                  maskChar=""
                  id="participantTell"
                  autoComplete='off'
                  placeholder=' '
                  value={tell}
                  onClick={showpromptTell}
                  onBlur={hidepromptTell}
                  onChange={event => setTell(event.target.value)}
                />

                <label>Ваш телефон</label>
              </div>}
          </div>
          <div className="price">
            Стоимость участия {storeData.tournamentPrice}
          </div>


          <div className="buttons">

            <button

              className={classNameGreen}
              onClick={newParticipant}
              disabled={storeDate.isLate}
            >
              {storeDate.isLate === false && <span>Записаться на турнир</span>}
              {storeDate.isLate === true && <span>Регистрация окончена</span>}
            </button>
            <button
              className={classNameRed}

              onClick={deleteParticipant}
              disabled={storeDate.isLate}
            >
              Удалиться с турнира
            </button>
          </div>
          <p id="tournamentRating">
            {storeData.tournamentRate}
          </p>

          <div className="line"></div>


        </form>
        <input className="drop_input" name='chacor' type="checkbox" id="chacor1" />
        <div className="drop_links">
          <div>
            {links.map((link) => {
              const linkName = Object.entries(link)[0][0];
              const linkHttp = Object.entries(link)[0][1];
              return <a
                key={linkHttp + linkName}
                href={linkHttp}
                target="_blank" rel="noreferrer"
              >{linkName}
              </a>
            }
            )}
          </div>

        </div>
        <label className='drop' htmlFor="chacor1">Важные ссылки</label>
      </div>


    </>
  )
}



export default Form



