import React from 'react'
import SubMenu from './SubMenu';
import { useSelector } from 'react-redux';

const MyHeader = () => {

	const mySelector = useSelector(state => state.spreadId);


	return (
		<div className="header">
			<div className="header__left">
				<div className="header__left_round"></div>
				<div>
					<p>Форма регистрации</p>
					<p>Любительская Лига НиНо</p>
				</div>
			</div>
			<div className="header__navbar">
				<ul className="header__navbar_menu">
					<li>Свободный
						<SubMenu id={mySelector.free} />
					</li>
					<li>Первый
						<SubMenu id={mySelector.first} />
					</li>
					<li>Второй
						<SubMenu id={mySelector.second} />
					</li>
					<li>Третий</li>
					<li>Высший </li>
					<li>ТТклаб</li>
				</ul>
			</div>
		</div>
	)
}

export default MyHeader
