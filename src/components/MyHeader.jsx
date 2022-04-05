import React, { useEffect, useLayoutEffect } from 'react'
import SubMenu from './SubMenu';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import classNames from 'classnames';
import { getDivisionsInfo } from '../actions/fetchDB';
import { setRole } from '../store/reducer';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModule/Modal/Modal';

const MyHeader = ({ adminMode }) => {
  const [isShown, setIsShown] = React.useState(true);
  let navigate = useNavigate();

  const state = useSelector(state => state.divisions).divisions;
  const adminState = useSelector(state => state.role);
  const dispatch = useDispatch();
  const hideModal = () => setIsShown(false);

  useLayoutEffect(() => {
    dispatch(getDivisionsInfo())
  }, [])


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
          <div className="header__left_round" ></div>
          <AuthModal />
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
            <button onClick={() => dispatch(setRole({ isAdmin: true }))}>РОль админа вкл</button>
            <br />
            <button onClick={() => console.log('rol', adminState)}>         /чек</button>
            <br />
            <button onClick={() => navigate('/admin')}>         /Админка го</button>
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
      </div>
    </>
  )
}

export default MyHeader
