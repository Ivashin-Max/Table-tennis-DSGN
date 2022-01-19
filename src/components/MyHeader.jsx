import React from 'react'
import SubMenu from './SubMenu';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

const MyHeader = () => {
	const [isShown, setIsShown] = React.useState(true);
	const mySelector = useSelector(state => state.spreadId);
	const hideModal = () =>  setIsShown(false);
  let className = classNames({
    "header__navbar_menu": true,
    "green": isShown
  });
  
	return (

		<div className="header">
			{isShown &&
				<><div className="modal"></div>
        <div id="scroll-down">
          <span className="arrow-down">
          </span>
          <span id="scroll-title">
            Выбери дивизион
          </span>
        </div>
        </>
        }
			<div className="header__left">
				<div className="header__left_round"></div>
				<div>
					<p>Форма регистрации</p>
					<p>Любительская Лига НиНо</p>
				</div>
			</div>
			<div className="header__navbar">
				<ul className={className} >
					<li >Свободный
						<SubMenu id={mySelector.free} onPress={hideModal} />
						<div className="header__navbar_line"></div>
					</li>
					<li>Первый
						<SubMenu id={mySelector.first} onPress={hideModal} />
						<div className="header__navbar_line"></div>
					</li>
					<li>Второй
						<SubMenu id={mySelector.second} onPress={hideModal} />
						<div className="header__navbar_line"></div>
					</li>
					<li>Третий
						<SubMenu id={mySelector.third} onPress={hideModal} />
						<div className="header__navbar_line"></div>
					</li>
					<li>Высший
						<SubMenu id={mySelector.high} onPress={hideModal} />
						<div className="header__navbar_line"></div>
					</li>
					<li>ТТклаб
						<SubMenu id={mySelector.ttClub} onPress={hideModal} />
						<div className="header__navbar_line"></div>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default MyHeader
