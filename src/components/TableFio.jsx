import React, { useState } from 'react'
import Tooltip from 'rc-tooltip';
// import 'rc-tooltip/assets/bootstrap_white.css';
import domAlign from 'dom-align';

// use domAlign
// sourceNode's initial style should be position:absolute;left:-9999px;top:-9999px;

const alignConfig = {
  offset: [-175, 5],            // the offset sourceNode by 10px in x and 20px in y,
  targetOffset: ['30%','40%'], // the offset targetNode by 30% of targetNode width in x and 40% of targetNode height in y,
  overflow: { adjustX: true, adjustY: true }, // auto adjust position when sourceNode is overflowed
};

const TableFio = ({ name, currentTournament }) => {

	return (
		<>

			<Tooltip placement="right"
				overlay={<span >{name}</span>} trigger={['hover']} mouseLeaveDelay={0} align={alignConfig} >
				<div className='neTable__row' key={name + currentTournament} id="sdfsfqweqwe" >
					<div className="neTable__row_square" ></div>
					<div className="neTable__row_fio" >{name} </div>
				</div>
			</Tooltip>
		</>
	)
}

export default TableFio

