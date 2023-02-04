import React from "react";
import { useDispatch } from "react-redux";
import { setCalendarMode, setTable } from "../store/reducer.js";
import { ReactComponent as PersonIcon } from "../styles/img/personWhite.svg";
import { ReactComponent as CalendarIcon } from "../styles/img/calendar-svgrepo-com (1).svg";
import { getTournamentDay, getTournamentDate } from "../actions/date";
import { getParticipants } from "../actions/fetchDB";
import { ReactComponent as GroupIcon } from "../styles/img/group-svgrepo-com.svg";
import { useSearchParams } from "react-router-dom";
import { useCurrentCity } from "../hooks/useCurrentTournament.js";

//Подменю хедера, которые мы создаём при ините
const SubMenu = ({ adminMode, zone }) => {
  const dispatch = useDispatch();
  const currentCity = useCurrentCity();

  let [, setSearchParams] = useSearchParams();

  // const newTournamentButton = 0;

  const onClick = React.useCallback(
    (divisionId, tournamentId) => async () => {
      await dispatch(
        setTable({
          neededDivisionId: divisionId,
          neededTournamentId: tournamentId,
          neededZone: zone.id,
        })
      );
      await dispatch(
        getParticipants(currentCity.id, zone.id, divisionId, tournamentId)
      );

      setSearchParams({
        tournament: tournamentId,
        division: divisionId,
        zone: zone.id,
        city: currentCity.id,
      });

      dispatch(setCalendarMode({ calendarMode: false }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, zone]
  );

  return (
    <>
      <ul className="header__navbar_menu_sub">
        {zone?.divisions?.map((division, index) => (
          <React.Fragment key={index}>
            {adminMode && <div>{division.division_name} дивизион</div>}
            {division?.tournaments?.map((tournament, index) => (
              <React.Fragment key={index}>
                {tournament?.tournament_name && (
                  <li onClick={onClick(division.id, tournament.id)}>
                    {tournament.tournament_name} |{" "}
                    <span>{getTournamentDate(tournament.date_time)}</span> |
                    <CalendarIcon className="person" />
                    <span>{getTournamentDay(tournament.date_time)}</span>|{" "}
                    {!!tournament.team ? (
                      <>
                        <GroupIcon className="svg__group" /> {tournament.count}
                      </>
                    ) : (
                      <>
                        <PersonIcon className="person" /> {tournament.count}
                      </>
                    )}
                  </li>
                )}
              </React.Fragment>
            ))}
            {adminMode && (
              <>
                <li
                  onClick={onClick(division.id, 0)}
                  className="header__navbar_menu_sub_admin"
                >
                  +
                </li>
              </>
            )}
          </React.Fragment>
        ))}
      </ul>
    </>
  );
};

export default SubMenu;
