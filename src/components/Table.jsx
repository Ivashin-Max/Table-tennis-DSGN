import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import copyIcon from '../styles/img/file-svgrepo-com.svg'
import classNames from 'classnames';

import TableFio from './TableFio'

const Table = () => {
  const [none, setNone] = useState(true);


  const selector = useSelector(state => state.data)
  const currentTournament = useSelector(state => state.table.neededTournamentName)
  console.log(`Данные по турниру ${currentTournament}`, selector);


  let classNameNone = classNames({
    "copy_popup": true,
    "copy_popup_none": none
  });

  const showCopy = () => {
    setNone(false);
    setTimeout(() => setNone(true), 1000)
  }

  const copyText = () => {
    const objectsArr = selector.tableFio;
    const arr = [];
    objectsArr.forEach(element => {
      arr.push(element.fio1, element.fio2)
    });
    let q = arr.filter((el) => !!el);
    navigator.clipboard.writeText(q.join('\n'))
  }

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
        {selector.doubleTournamentFlag && selector.tableFio?.map((name) => (
          <TableFio
            name={name.fio1}
            name2={name.fio2}
            rttf1={name.rttf1}
            rttf2={name.rttf2}
            currentTournament={currentTournament}
            key={name + currentTournament}
          />
        ))
        }
        {!selector.doubleTournamentFlag && selector.tableFio?.map((name) => (
          <TableFio
            name={name.fio1}
            rttf1={name.rttf1}
            currentTournament={currentTournament}
            key={name + currentTournament}
          />
        ))
        }
      </div>
      <div className="neTable__total">
        {`Total ${selector.tableFio.length}/${selector.tableTotal}`}
        <div
          title='Скопировать участников'
          onClick={() => {
            showCopy()
            copyText();
          }}

        >
          <img src={copyIcon} alt="" className='copy' />

        </div>
        <div className={classNameNone}> Участники скопированы</div>
      </div>

      <p>Запас</p>
      <div id="neTable__total" className="neTable__zapas">
        {//FIXME:
          //ЗАПАС
        }
        {selector.tableZapas?.map((name) => (
          <div className='neTable__row zapas' key={name + currentTournament}>
            <div className="neTable__row_square"></div>
            <div className="neTable__row_fio" >{name.fio1} </div>
          </div>
        ))
        }
      </div>
    </div>
  )
};


export default Table

