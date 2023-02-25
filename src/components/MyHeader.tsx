import SubMenu from "./SubMenu";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import ModalAuth from "./AuthModule/Modal/Modal";
import Button from "./Styled/Button";
import { useCurrentCity } from "../hooks/useCurrentTournament";
import CitySelect from "./CitySelect";
import MySelect from "./MySelect";
import { useSearchParams } from "react-router-dom";
import { IStructure, IStructureZone } from "../types/fetch";
import { useTypedSelector } from "../hooks/useTypedSelector";

export const UNSORTED_CITY = "unsorted";
interface MyHeaderProps {
  adminMode?: boolean;
  divisions?: boolean;
  structure?: IStructure;
  activeCityId?: number;
}
const MyHeader = ({
  adminMode = false,
  divisions = false,
  structure = [],
  activeCityId = -1,
}: MyHeaderProps) => {
  let navigate = useNavigate();
  const isAdmin = !!sessionStorage.getItem("admin");
  const state = useTypedSelector((state) => state.divisions)?.divisions;
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCity = useCurrentCity();

  let className = classNames({
    header__navbar_menu: true,
  });

  const city = searchParams.get("city");
  const zone = searchParams.get("zone");

  const cities = structure
    ?.filter((el) => {
      if (el.id === 1 && !isAdmin) {
        return false;
      } else {
        return true;
      }
    })
    .map((el) => {
      return { value: el.id, text: el.city };
    });

  const zones = structure
    .find((el) => el.id === activeCityId)
    ?.zones?.map((el) => {
      return { value: el.id, text: el.name };
    });

  const handleCityChange = (value: string) => {
    setSearchParams({ city: value.toString() });
  };

  const handleZoneChange = (value: string) => {
    city && setSearchParams({ city: city, zone: value.toString() });
  };

  return (
    <>
      <div className="header">
        <div className="header__left">
          <Link className="header__left_round" to={"/user"} />
          <div className="header__text">
            {isAdmin ? (
              <Button onClick={() => navigate("/admin")}>
                Админская панель
              </Button>
            ) : (
              <>
                <p>Spin Лига</p>
                <p>Форма регистрации</p>
              </>
            )}
          </div>
          {!divisions && <CitySelect />}
        </div>

        {!divisions && state && (
          <div className="header__navbar">
            <ul className={className}>
              {currentCity?.zones?.map((zone: IStructureZone) => {
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
        {divisions && (
          <>
            <MySelect
              options={cities}
              changeCallback={(e) => handleCityChange(e)}
              label="Город"
              pushedValue={city ? +city : undefined}
            />
            <MySelect
              options={zones}
              changeCallback={(e) => handleZoneChange(e)}
              label="Зона"
              pushedValue={zone ? +zone : undefined}
            />
          </>
        )}
        <div className="header__flex">
          {!divisions && (
            <Button
              onClick={() => navigate(`/divisions?city=${currentCity.id}`)}
              divisions
            >
              Дивизионы
            </Button>
          )}
          {divisions && (
            <Button
              onClick={() => navigate(`/user`)}
              divisions
            >
              Регистрация
            </Button>
          )}
          <ModalAuth />
        </div>
      </div>
    </>
  );
};

export default MyHeader;
