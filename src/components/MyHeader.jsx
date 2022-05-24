import React from 'react'
import SubMenu from './SubMenu';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import ModalAuth from './AuthModule/Modal/Modal';


const MyHeader = ({ adminMode }) => {

  let navigate = useNavigate();
  const isAdmin = !!sessionStorage.getItem('admin');
  const state = useSelector(state => state.divisions).divisions;

  let className = classNames({
    "header__navbar_menu": true,
  });

  return (
    <>
      <div className="header">
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
