import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import logoPingPong from '../styles/img/ping-pong.svg'


import logoPingPongLoader from '../styles/img/ping-pong-loader.svg'
import person from '../styles/img/personBlue.svg'
import logoTelegramm from '../styles/img/telegram-svgrepo-com.svg'
// import { fetchTableData } from '../actions/fetchTableData';
import { useDispatch } from 'react-redux';
import { removeStorageItem, checkStoragedId, getPromptFio, getPromptTell, addFioToStorage } from '../actions/localStorage';
import InputMask from 'react-input-mask';
import Tooltip from 'rc-tooltip';
import { openModal } from '../store/reducer';
import { ReactComponent as ClearStorageIcon } from '../styles/img/x-svgrepo-com.svg';
import classNames from 'classnames';
import { useCurrentTournament } from '../hooks/useCurrentTournament';
import { addParticipant, deleteParticipantDB, getLinks, getParticipants } from '../actions/fetchDB';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { checkDate } from '../actions/date';
import { motion } from 'framer-motion/dist/framer-motion';
import url from '../static/url.json';
import { promptAnimate } from '../styles/animations/formAnimations';
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
  const [isLate, setIsLate] = useState(true);
  const authFio = useTypedSelector(state => state.auth.fio)
  const dispatch = useDispatch();
  const storeData = useSelector(state => state.data)

  const [links, setLinks] = useState([])
  const storeDate = useSelector(state => state.date)
  const [fio, setFio] = useState('');
  const [fio2, setFio2] = useState('');
  const [tell, setTell] = useState('')
  const currentTournament = useCurrentTournament();

  let classNameGreen = classNames({
    "buttons_disabled": isLate,
    "buttons_green": !isLate
  });
  let classNameRed = classNames({
    "buttons_disabled": isLate,
    "buttons_red": !isLate
  });


  React.useEffect(() => {
    console.log(currentTournament);
    if (currentTournament) {
      setIsLate(checkDate(currentTournament.date_time))
    }
  }, [currentTournament])

  React.useEffect(() => {
    getLinks()
      .then(
        ({ data }) => {
          console.log('Links', data)
          setLinks(data)
        })
      .catch(function (error) {
        console.log(error.toJSON());
        setLinks([{ id: 1, title: 'Ошибка загрузки ссылок', link: '#' }])
      });

  }, [])


  const checkEmptyInputs = () => {
    // const vkId = checkStoragedId();

    if (fio.trim() === '') {
      dispatch(openModal({ title: 'Ошибка!', modalMsg: 'Введите ФИО' }));

      setLoading(false)
      return false
    }
    else if (tell.length !== 17
      // &&       !vkId
    ) {
      dispatch(openModal({ title: 'Ошибка!', modalMsg: 'Введите телефон в корректном формате' }));
      setLoading(false)
      return false
    }
  }


  const deleteParticipant = async (e) => {
    e.preventDefault();
    const emptyInputs = checkEmptyInputs();

    if (emptyInputs !== false) {
      // const vkId = checkStoragedId();
      const participant = {
        tournamentId: currentTournament.id,
        name: fio,
        name_2: currentTournament.team ? fio2 : "",
        password:
          // vkId ? vkId :
          tell
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
      const newParticipant = {
        tournamentId: currentTournament.id,
        name: fio,
        name_2: currentTournament.team ? fio2 : "",
        password: tell
      }
      addFioToStorage(fio)
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
            <a
              href={url.bot}
              target='_blank'
              className="form_header_vk" rel="noreferrer">
              <img className="form_header_img left" src={logoTelegramm} alt="telegram Logo" />
              <span className="span black">Бот</span>
            </a>

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
              {promptFio && <motion.div animate={{ height: 'auto' }} initial={{ height: 0 }} className="fioPrompt">
                {authFio && <motion.div
                  initial='hidden'
                  animate='visible'
                  custom={1}
                  variants={promptAnimate}
                  onMouseDown={autoCompleteFio}
                >
                  {authFio}
                </motion.div>}
                {
                  getPromptFio().map((name, index) => {
                    if (name === authFio) return <div />
                    else return (
                      <motion.div
                        initial='hidden'
                        animate='visible'
                        custom={index + 2}
                        variants={promptAnimate}
                        key={name}
                        onMouseDown={autoCompleteFio}
                      >
                        {name}
                      </motion.div>
                    )
                  })
                }
              </motion.div>}

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
            Стоимость участия: {storeData.tournamentPrice > 0 ? `${storeData.tournamentPrice} рублей` : "бесплатно"}
          </div>


          <div className="buttons">

            <button

              className={classNameGreen}
              onClick={newParticipant}
              disabled={isLate}
            >
              {isLate === false && <span>Записаться на турнир</span>}
              {isLate === true && <span>Регистрация окончена</span>}
            </button>
            <button
              className={classNameRed}

              onClick={deleteParticipant}
              disabled={isLate}
            >
              Удалиться с турнира
            </button>
          </div>
          {<p id="tournamentRating">
            <span>Рейтинг: </span>{storeData.tournamentRate > 0 ? storeData.tournamentRate : "Без ограничений"}
          </p>}

          <div className="line"></div>



        </form>
        <input className="drop_input" name='chacor' type="checkbox" id="chacor1" />
        <div className="drop_links">
          <div>
            {links.map((link) => {
              return <a
                key={link.id}
                href={link.link}
                target="_blank" rel="noreferrer"
              >{link.title}
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



