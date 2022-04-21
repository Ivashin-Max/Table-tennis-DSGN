import React from 'react'
import SubMenu from './SubMenu';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import ModalAuth from './AuthModule/Modal/Modal';


const MyHeader = ({ adminMode }) => {
  const [isShown, setIsShown] = React.useState(false);
  let navigate = useNavigate();
  const isAdmin = !!sessionStorage.getItem('admin');
  const state = useSelector(state => state.divisions).divisions;

  const hideModal = () => setIsShown(false);



  let className = classNames({
    "header__navbar_menu": true,
    "green": isShown
  });

  return (
    <>
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
          <div className="header__left_round" onClick={() => navigate('/user')} ></div>

          <div>
            {adminMode ?
              <>
                <p>Админка</p>
              </> :
              <>
                <p>Форма регистрации</p>
                <p>Любительская Лига НиНо</p>
              </>
            }

            {isAdmin && <button onClick={() => navigate('/admin')}>         /Админка го</button>}

          </div>
        </div>
        {state && <div className="header__navbar">
          <ul className={className} >
            {state.map((division) => {
              return <li key={division.id}>{division.division_name}
                <SubMenu
                  divisionId={division.id}
                  tournaments={division.tournaments}
                  onPress={hideModal}
                  adminMode={adminMode}
                />
              </li >
            })}

          </ul>
        </div>}
        <ModalAuth />
      </div>
    </>
  )
}

export default MyHeader
