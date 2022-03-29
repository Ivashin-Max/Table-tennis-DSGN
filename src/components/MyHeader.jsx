import React, { useEffect } from 'react'
import SubMenu from './SubMenu';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import classNames from 'classnames';
import url from '../static/url.json';
import axios from 'axios';
import { setDivisions } from '../store/reducer';


const MyHeader = () => {
  const [isShown, setIsShown] = React.useState(true);
  const mySelector = useSelector(state => state.test);
  const divisions = useSelector(state => state.divisions);
  const dispatch = useDispatch();
  const hideModal = () => setIsShown(false);

  useEffect(() => {
    axios.get(url.back + url.endpoints.divisions)
      .then(({ data }) => {
        console.log('Axios', data);
        dispatch(setDivisions({ divisions: data }))
      });


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
          <div className="header__left_round"></div>
          <div>
            <p>Форма регистрации</p>
            <p>Любительская Лига НиНо</p>
          </div>
        </div>
        <div className="header__navbar">
          <ul className={className} >
            {divisions.divisions.divisions && divisions.divisions.divisions.map((division) => {
              return <li>{division.division_name}
                <SubMenu
                  url={1}
                  tournaments={division.tournaments}
                  onPress={hideModal}
                />
              </li >
            })}

          </ul>
        </div>
      </div>
    </>
  )
}

export default MyHeader
