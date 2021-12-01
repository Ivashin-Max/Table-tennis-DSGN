import React, { useState } from 'react'
import Tooltip from 'rc-tooltip';
// import 'rc-tooltip/assets/bootstrap_white.css';


const TableFio = ({ name, currentTournament }) => {

	return (
		<>

			<Tooltip placement="bottomRight"
				overlay={<span >{name}</span>} trigger={['hover']} mouseLeaveDelay={0} >
				<div className='neTable__row' key={name + currentTournament} id="sdfsfqweqwe" >
					<div className="neTable__row_square" ></div>
					<div className="neTable__row_fio" >{name} </div>
				</div>
			</Tooltip>
		</>
	)
}

export default TableFio

