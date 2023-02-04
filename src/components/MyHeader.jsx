import SubMenu from "./SubMenu";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import ModalAuth from "./AuthModule/Modal/Modal";
import Button from "./Styled/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { setCity } from "../store/reducer.js";
import { useCurrentCity } from "../hooks/useCurrentTournament";
import { useEffect } from "react";

export const UNSORTED_CITY = "unsorted";

const MyHeader = ({ adminMode = false }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdmin = !!sessionStorage.getItem("admin");
  const state = useSelector((state) => state.divisions)?.divisions;

  const currentCity = useCurrentCity();

  const handleChange = (event) => {
    dispatch(setCity({ city: event.target.value }));
  };

  let className = classNames({
    header__navbar_menu: true,
  });

  return (
    <>
      <div className="header">
        <div className="header__left">
          <div
            className="header__left_round"
            onClick={() => navigate("/user")}
          ></div>

          <div>
            {isAdmin ? (
              <>
                <Button onClick={() => navigate("/admin")}>
                  Админская панель
                </Button>
              </>
            ) : (
              <>
                <p>Форма регистрации</p>
                <p>Любительская Лига НиНо</p>
              </>
            )}

            {/* {isAdmin && <Button small onClick={() => navigate('/admin')}>Админская панель</Button>} */}
          </div>
        </div>

        <Select value={currentCity} label="Город" onChange={handleChange}>
          {state?.map((city, index) => (
            <MenuItem value={city} key={index}>
              {city.city}
            </MenuItem>
          ))}
        </Select>
        {state && (
          <div className="header__navbar">
            <ul className={className}>
              {currentCity?.zones?.map((zone) => {
                return (
                  <li key={zone.id}>
                    {zone.name}
                    <SubMenu adminMode={adminMode} zone={zone} />
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <ModalAuth />
      </div>
    </>
  );
};

export default MyHeader;
