import React, { useEffect } from 'react'
import SubMenu from './SubMenu';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUser } from '../actions/localStorage';
import classNames from 'classnames';
import { getDivisionsInfo } from '../actions/fetchDB';
import { getRegistrationNames, profileInfo } from '../actions/Profile/profileRequests';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModule/Modal/Modal';

const MyHeader = ({ adminMode }) => {
  const [isShown, setIsShown] = React.useState(true);
  let navigate = useNavigate();
  const isAdmin = !!sessionStorage.getItem('admin');
  const state = useSelector(state => state.divisions).divisions;
  // const adminState = useSelector(state => state.role);
  const profileId = getUser()?.id
  const dispatch = useDispatch();
  const hideModal = () => setIsShown(false);

  useEffect(() => {
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
          <div className="header__left_round" onClick={() => navigate('/user')} ></div>
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
            <button onClick={() => {

              // if (profileId) return profileInfo(44).then((res) => console.log(res))
              getRegistrationNames().then(res => console.log(res))
            }}>profil</button>
            <br />

            <br />
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
      </div>
    </>
  )
}

export default MyHeader
