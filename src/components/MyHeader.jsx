import React from 'react'
import SubMenu from './SubMenu';
import { useSelector } from 'react-redux';

const MyHeader = () => {
	const [isShown, setIsShown] = React.useState(true);
	const mySelector = useSelector(state => state.spreadId);
	const hideModal = () => setIsShown(false);

	return (

		<div className="header">
			{isShown &&
				<div className="modal"></div>}
			<div className="header__left">
				<div className="header__left_round"></div>
				<div>
					<p>Форма регистрации</p>
					<p>Любительская Лига НиНо</p>
				</div>
			</div>
			<div className="header__navbar">
				<ul className="header__navbar_menu" onClick={hideModal}>
					<li >Свободный
						<SubMenu id={mySelector.free} onClick={() => { console.log('sdfs'); }} />
						<div className="header__navbar_line"></div>
					</li>
					<li>Первый
						<SubMenu id={mySelector.first} />
						<div className="header__navbar_line"></div>
					</li>
					<li>Второй
						<SubMenu id={mySelector.second} />
						<div className="header__navbar_line"></div>
					</li>
					<li>Третий
						<SubMenu id={mySelector.third} />
						<div className="header__navbar_line"></div>
					</li>
					<li>Высший
						<SubMenu id={mySelector.high} />
						<div className="header__navbar_line"></div>
					</li>
					<li>ТТклаб
						<SubMenu id={mySelector.ttClub} />
						<div className="header__navbar_line"></div>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default MyHeader
