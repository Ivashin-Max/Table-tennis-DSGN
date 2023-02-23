import SubMenu from "./SubMenu";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import ModalAuth from "./AuthModule/Modal/Modal";
import Button from "./Styled/Button";
import { useCurrentCity } from "../hooks/useCurrentTournament";
import CitySelect from "./CitySelect";

export const UNSORTED_CITY = "unsorted";

const MyHeader = ({ adminMode = false, divisions = false }) => {
  let navigate = useNavigate();
  const isAdmin = !!sessionStorage.getItem("admin");
  const state = useSelector((state) => state.divisions)?.divisions;

  const currentCity = useCurrentCity();

  let className = classNames({
    header__navbar_menu: true,
  });

  return (
    <>
      <div className="header">
        <div className="header__left">
          <Link className="header__left_round" to={"/user"} />
          <div>
            {isAdmin ? (
              <Button onClick={() => navigate("/admin")}>
                Админская панель
              </Button>
            ) : (
              <>
                <p>Форма регистрации</p>
                <p>Любительская Лига НиНо</p>
              </>
            )}

            {/* {isAdmin && <Button small onClick={() => navigate('/admin')}>Админская панель</Button>} */}
          </div>
        </div>
        {/* <div className="header__navbarWrapper"> */}
        {!divisions && (
          <Button onClick={() => navigate(`/divisions?city=${currentCity.id}`)}>
            Дивизионы
          </Button>
        )}
        {!divisions && <CitySelect />}

        {!divisions && state && (
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
