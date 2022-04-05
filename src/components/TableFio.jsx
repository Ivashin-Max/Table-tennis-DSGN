import React from 'react'
import Tooltip from 'rc-tooltip';
import { useCurrentTournament } from '../hooks/useCurrentTournament';
import { useTypedSelector } from '../hooks/useTypedSelector'
import { deleteParticipantDB } from '../actions/fetchDB';




const alignConfig = {
  offset: [-175, 5],            // the offset sourceNode by 10px in x and 20px in y,
  targetOffset: ['30%', '40%'], // the offset targetNode by 30% of targetNode width in x and 40% of targetNode height in y,
  overflow: { adjustX: true, adjustY: true }, // auto adjust position when sourceNode is overflowed
};

const TableFio = ({ participant, currentTournament, zapas }) => {
  const isAdmin = useTypedSelector(state => state.role).isAdmin
  const zapasClassName = zapas ? 'neTable__row zapas' : 'neTable__row';




  return (
    <>

      <Tooltip placement="right"
        overlay={
          <>
            <div className="neTable__row_fio" >{participant.rating}{participant.name} </div>
            <div className="neTable__row_fio" >{participant.rating_2}{participant.name_2} </div>
          </>
        }
        trigger={['hover']} mouseLeaveDelay={0} align={alignConfig}
      >
        <div className={zapasClassName} key={participant.name + currentTournament} id="sdfsfqweqwe" >
          <div className="neTable__row_square" ></div>
          <div>
            <div className="neTable__row_fio" >{participant.rating}{participant.name} </div>
            <div className="neTable__row_fio" >{participant.rating_2}{participant.name_2} </div>
          </div>
        </div>
      </Tooltip>
      {isAdmin && <div className="neTable__row_fio" >
        <button>ред</button>
        <button onClick={() => deleteParticipantDB(participant)}>|удалить</button>
      </div>
      }
    </>
  )
}

export default TableFio

