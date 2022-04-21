import React, { useState } from 'react';
import copyIcon from '../styles/img/file-svgrepo-com.svg'
import classNames from 'classnames';

import TableFio from './TableFio'
import { useTypedSelector } from '../hooks/useTypedSelector';

const Table = ({ adminMode }: any) => {
  const [none, setNone] = useState(true);
  const copyToClip = (arr: any[]) => {
    let stringsArr = []
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];

      stringsArr.push(element.name)
      if (element.name_2) stringsArr.push(element.name_2)

    }

    return stringsArr.join('\n')
  }

  const selector = useTypedSelector(state => state.data)
  const currentTournament = useTypedSelector(state => state.table.neededTournamentId)
  // console.log(`Данные по турниру ${currentTournament}`, selector);


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
        {selector.tableFio?.map((participant: any) => (
          <TableFio
            adminMode={adminMode}
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

            navigator.clipboard.writeText(copyToClip(selector.tableFio))
          }}
        // className= {classNameNone}
        >
          <img src={copyIcon} alt="Иконка файла" className='copy' />

        </div>
        <div className={classNameNone}> Участники скопированы</div>
      </div>

      <p>Запас</p>
      <div id="neTable__total" className="neTable__zapas">
        {selector.tableZapas?.map((participant: any) => {

          return <TableFio
            zapas
            participant={participant}
            adminMode={adminMode}
            currentTournament={currentTournament}
            key={participant.name + currentTournament}
          />
        })
        }
      </div>
    </div>
  )
};


export default Table

