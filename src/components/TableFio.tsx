import Tooltip from 'rc-tooltip';
import { deleteParticipantAdmin } from '../actions/Admin/adminRequests';
import { useDispatch } from 'react-redux';
import { TableFioProps } from '../types/props';



const alignConfig = {
  offset: [-175, 5],            // the offset sourceNode by 10px in x and 20px in y,
  targetOffset: [80, 13], // the offset targetNode by 30% of targetNode width in x and 40% of targetNode height in y,
  overflow: { adjustX: true, adjustY: true }, // auto adjust position when sourceNode is overflowed
};

const TableFio = ({ currentTournament, participant, adminMode, zapas }: TableFioProps) => {



  const zapasClassName = zapas ? 'neTable__row zapas' : 'neTable__row';
  const dispatch = useDispatch();

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
      {adminMode === true && <div className="neTable__row_fio" >
        <button>ред</button>
        <button onClick={() => dispatch(deleteParticipantAdmin(participant.name, currentTournament))}>|удалить</button>
      </div>
      }
    </>
  )
}

export default TableFio

