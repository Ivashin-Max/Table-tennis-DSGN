import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import copyIcon from '../styles/img/file-svgrepo-com.svg'
import classNames from 'classnames';

import TableFio from './TableFio'

const Table = ({ adminMode }) => {
  const [none, setNone] = useState(true);


  const selector = useSelector(state => state.data)
  const currentTournament = useSelector(state => state.table.neededTournamentId)
  console.log(`Данные по турниру ${currentTournament}`, selector);


  let classNameNone = classNames({
    "copy_popup": true,
    "copy_popup_none": none
  });

  const showCopy = () => {
    setNone(false);
    setTimeout(() => setNone(true), 1000)
  }


  return (
    <div id="neTable" className='neTable'>
      <button onClick={() => console.log('selector', selector)}>fsdfsdfsdf</button>
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
        {selector.tableFio?.map((participant) => (
          <TableFio
            participant={participant}
            currentTournament={currentTournament}
            key={participant.name + currentTournament}
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
            navigator.clipboard.writeText(selector.tableFio.join('\n'))
          }}
        // className= {classNameNone}
        >
          <img src={copyIcon} alt="" className='copy' />

        </div>
        <div className={classNameNone}> Участники скопированы</div>
      </div>

      <p>Запас</p>
      <div id="neTable__total" className="neTable__zapas">
        {selector.tableZapas?.map((participant) => {

          return <TableFio zapas={true} participant={participant} currentTournament={currentTournament} key={participant.name + currentTournament} />
        })
        }
      </div>
    </div>
  )
};


export default Table

