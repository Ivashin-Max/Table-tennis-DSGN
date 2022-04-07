import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import logoPingPong from '../styles/img/ping-pong.svg'
import logoVk from '../styles/img/VK_Compact_Logo.svg'

import logoPingPongLoader from '../styles/img/ping-pong-loader.svg'
import person from '../styles/img/personBlue.svg'
import logoVkBlack from '../styles/img/VK_Compact_Logo_Black.svg'
// import { fetchTableData } from '../actions/fetchTableData';
import { useDispatch } from 'react-redux';
import { removeStorageItem, checkStoragedId, getPromptFio, getPromptTell, setId } from '../actions/localStorage';
import InputMask from 'react-input-mask';
import Tooltip from 'rc-tooltip';
import { openModal } from '../store/reducer';
import { ReactComponent as ClearStorageIcon } from '../styles/img/x-svgrepo-com.svg';
import classNames from 'classnames';
import { useCurrentTournament } from '../hooks/useCurrentTournament';
import { addParticipant, deleteParticipantDB, getParticipants } from '../actions/fetchDB';


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
  const [fio, setFio] = useState('');
  const [fio2, setFio2] = useState('');
  const [tell, setTell] = useState('')
  const currentTournament = useCurrentTournament();

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

  const checkEmptyInputs = () => {
    const vkId = checkStoragedId();

    if (fio.trim() === '') {
      dispatch(openModal({ title: 'Ошибка!', modalMsg: 'Введите ФИО' }));

      setLoading(false)
      return false
    }
    else if (tell.length !== 17 && !vkId) {
      dispatch(openModal({ title: 'Ошибка!', modalMsg: 'Введите телефон в корректном формате' }));
      setLoading(false)
      return false
    }
  }


  const deleteParticipant = async (e) => {
    e.preventDefault();
    const emptyInputs = checkEmptyInputs();

    if (emptyInputs !== false) {
      const vkId = checkStoragedId();
      const participant = {
        tournamentId: currentTournament.id,
        name: fio,
        name_2: currentTournament.team ? fio2 : "",
        password: vkId ? vkId : tell
      }
      const response = await deleteParticipantDB(participant);
      if (response.success === true) {
        await dispatch(getParticipants(currentTournament.id));
        dispatch(openModal({
          title: 'Успешно',
          modalMsg: currentTournament.team ?
            `Участники ${fio}, ${fio2} удалены успешно` :
            `Участник ${fio} удален успешно`
        }));
      }
      else dispatch(openModal({ title: 'Ошибка!', modalMsg: `Ошибка удаления: ${response.data}` }));

      console.log(response)
    }
  }



  const newParticipant = async (e) => {
    e.preventDefault();
    const emptyInputs = checkEmptyInputs();

    if (emptyInputs !== false) {
      setLoading(true)
      const vkId = checkStoragedId();
      const newParticipant = {
        tournamentId: currentTournament.id,
        name: fio,
        name_2: currentTournament.team ? fio2 : "",
        password: vkId ? vkId : tell
      }
      const response = await addParticipant(newParticipant);
      if (response.success === true) {
        await dispatch(getParticipants(currentTournament.id));
        dispatch(openModal({
          title: 'Успешно',
          modalMsg: currentTournament.team ?
            `Участники ${fio}, ${fio2} добавлены успешно` :
            `Участник ${fio} добавлен успешно`
        }));
      }
      else {
        dispatch(openModal({ title: 'Ошибка!', modalMsg: `Ошибка добавления: ${response.data}` }))
      }


      console.log('response', response)

      setLoading(false)
    }
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
          // showModalMsg("Ошибка авторизации");
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



            {currentTournament?.team !== null && currentTournament?.team === 1 &&
              <div className="placeholder-container">
                <input
                  type="text"
                  placeholder=' '
                  id="newParticipantName"
                  autoComplete='off'
                  value={fio2}
                  onChange={event => setFio2(event.target.value)}
                />
                <label >ФИО второго участника</label>
              </div>
            }



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
            Стоимость участия {storeData.tournamentPrice} рублей
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
          {<p id="tournamentRating">
            <span>Рейтинг: </span>{storeData.tournamentRate}
          </p>}

          <div className="line"></div>


        </form>
        <input className="drop_input" name='chacor' type="checkbox" id="chacor1" />
        <div className="drop_links">
          <div>
            {[].map((link) => {
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
      </div >


    </>
  )
}



export default Form



