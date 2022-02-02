import React from 'react'
import Tooltip from 'rc-tooltip';





const alignConfig = {
  offset: [-175, 5],            // the offset sourceNode by 10px in x and 20px in y,
  targetOffset: ['30%', '40%'], // the offset targetNode by 30% of targetNode width in x and 40% of targetNode height in y,
  overflow: { adjustX: true, adjustY: true }, // auto adjust position when sourceNode is overflowed
};

const TableFio = ({ name, name2, rttf1, rttf2, currentTournament }) => {



  return (
    <>

      <Tooltip
        placement="right"
        overlay={
          <>
            <div>
              <div >{name}</div>
              {name2 !== undefined && <div>{name2}</div>}
            </div>

          </>
        }
        trigger={['hover']}
        mouseLeaveDelay={0}
        align={alignConfig}
      >
        <div className='neTable__row' key={name + currentTournament} id="sdfsfqweqwe" >
          <div className="neTable__row_square" ></div>
          <div>
            <div className="neTable__row_fio" >{name} </div>
            {name2 !== undefined && <div className="neTable__row_fio" >{name2} </div>}
          </div>
          <div>
            <div  >{rttf1} </div>
            {name2 !== undefined && <div  >{rttf2} </div>}
          </div>
        </div>
      </Tooltip>
    </>
  )
}

export default TableFio

