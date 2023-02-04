import { useEffect, useState } from "react";

import { CalendarDate, CalendarEvent } from "../../types/calendar";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {
  getNextWeek,
  getTournamentDate,
  getTournamentTime,
} from "../../actions/date";

import { ReactComponent as PersonIcon } from "../../styles/img/personWhite.svg";
import { ReactComponent as StarIcon } from "../../styles/img/star-svgrepo-com.svg";
import { ReactComponent as CalendarPrizeIcon } from "../../styles/img/filled-gift-svgrepo-com.svg";
import { ReactComponent as GroupIcon } from "../../styles/img/group-svgrepo-com.svg";

import Tooltip from "rc-tooltip";
import { useDispatch } from "react-redux";
import { setTable } from "../../store/reducer";
import { getParticipants } from "../../actions/fetchDB";
import classNames from "classnames";
import { useSearchParams } from "react-router-dom";
import { IDivision, IZone } from "../../types/fetch";
import React from "react";

const alignConfig = {
  offset: [-15, 5], // the offset sourceNode by 10px in x and 20px in y,
  targetOffset: [10, 85], // the offset targetNode by 30% of targetNode width in x and 40% of targetNode height in y,
  overflow: { adjustX: true, adjustY: true }, // auto adjust position when sourceNode is overflowed
};

const MyCalendar = ({ flipCard }: any) => {
  const currentCity = useTypedSelector((state) => state.city).city;

  let [, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [days, setDays] = useState<CalendarDate[]>([]);
  const isMobile = window.innerWidth < 500 ? true : false;
  const [visible, setVisible] = useState(0);

  let classNameEvent = classNames({
    calendar__event: true,
  });

  const clickHandler = (tournament: any) => {
    let counter = 0;

    return async () => {
      counter += 1;
      setVisible(tournament.id);
      if (!isMobile) counter = 10;
      if (counter > 1) {
        setVisible(0);
        await dispatch(
          setTable({
            neededDivisionId: tournament.division,
            neededTournamentId: tournament.id,
            neededZone: tournament.zoneId,
          })
        );
        setSearchParams({
          tournament: tournament.id,
          division: tournament.division,
          zone: tournament.zoneId,
          city: currentCity.id,
        });
        await dispatch(
          getParticipants(
            currentCity.id,
            tournament.zoneId,
            tournament.division,
            tournament.id
          )
        );
        flipCard();
      }
    };
  };

  const prizesParse = (prize: any) => {
    if (prize === "{}") return false;

    let prizesObj: any = [];
    let counter = 0;
    try {
      prizesObj = Object.entries(JSON.parse(prize)).filter(
        (el) => el[0] !== "formFields"
      );
    } catch (e) {
      console.log("prizes Error", e);
      return false;
    }

    for (let i = 0; i < prizesObj.length; i++) {
      const element = prizesObj[i];
      if (element[1].length > 0) counter++;
    }
    if (counter === 0) return false;
    else return true;
  };

  const tournamentsToEvents = (tournaments: any[]) => {
    const eventsFromTournaments = tournaments.map((tournamet) => {
      console.log("tournamet", tournamet);
      const tourDate = new Date(tournamet.date_time);
      const tourDateString = getTournamentDate(new Date(tournamet.date_time));
      const tourTitle = tournamet.tournament_name;
      const event = {
        title: tourTitle,
        date: tourDate,
        tourDateString: tourDateString,
        tournamentInfo: tournamet,
      };
      // console.log(event)
      return event;
    });
    return eventsFromTournaments;
  };

  useEffect(() => {
    const nextWeek = getNextWeek();
    setDays(nextWeek);
  }, []);

  useEffect(() => {
    if (currentCity) {
      const allZonesDivisions: IDivision[] = currentCity.zones
        ?.map((zone: IZone) => {
          zone.divisions.forEach((division) => {
            division.zoneId = zone.id;
          });
          return zone.divisions;
        })
        ?.flat();

      const allTournaments = allZonesDivisions
        ?.map((division) => {
          division.tournaments.forEach((tournament) => {
            tournament.zoneId = division.zoneId;
          });
          return division.tournaments;
        })
        ?.flat();

      setTournaments(allTournaments ?? []);
    }
  }, [currentCity]);

  useEffect(() => {
    const events = tournamentsToEvents(tournaments);
    if (tournaments) {
      setEvents(events);
    }
  }, [tournaments]);

  const EventsRow = (neededEvent: CalendarEvent, index: number) => {
    console.log("🚀 ~ neededEvent", neededEvent);
    return (
      <Tooltip
        placement="right"
        key={index}
        overlay={
          <>
            <div>
              <div className="calender__tooltipRow">
                Название: {neededEvent.tournamentInfo.tournament_name}
              </div>
              <div className="calender__tooltipRow">
                Цена: {neededEvent.tournamentInfo.cost}
              </div>
              <div className="calender__tooltipRow">
                Локация: {neededEvent.tournamentInfo.location}
              </div>
              <div className="calender__tooltipRow">
                Рейтинг: {neededEvent.tournamentInfo.rating_range}
              </div>

              <div className="calender__tooltipRow">
                Дата: {getTournamentDate(neededEvent.tournamentInfo.date_time)}
              </div>
              <div className="calender__tooltipRow">
                Время: {getTournamentTime(neededEvent.tournamentInfo.date_time)}
              </div>
            </div>
          </>
        }
        mouseLeaveDelay={0}
        align={alignConfig}
        visible={neededEvent.tournamentInfo.id === visible ? true : false}
      >
        <div
          className={classNameEvent}
          onClick={clickHandler(neededEvent.tournamentInfo)}
          onMouseEnter={() => setVisible(neededEvent.tournamentInfo.id)}
          onMouseLeave={() => setVisible(0)}
        >
          {neededEvent.tournamentInfo.team ? (
            <div>
              {getTournamentTime(neededEvent.tournamentInfo.date_time)}
              <GroupIcon className="person" />
              {neededEvent.tournamentInfo.count}
            </div>
          ) : (
            <div>
              {getTournamentTime(neededEvent.tournamentInfo.date_time)}
              <PersonIcon className="person" />
              {neededEvent.tournamentInfo.count}
            </div>
          )}
          <div className="calendar__starRow">
            <StarIcon className="svg__star_table svg__star" />
            {neededEvent.tournamentInfo.rating_range === "0" ? (
              <span className="infinite">∞</span>
            ) : (
              neededEvent.tournamentInfo.rating_range
            )}
          </div>
          {prizesParse(neededEvent.tournamentInfo.prize) ? (
            <div>
              <CalendarPrizeIcon className="svg__calendarPrize svg__calendarPrize_colored" />
            </div>
          ) : null}
        </div>
      </Tooltip>
    );
  };

  return (
    <div className="calendar__wrapper">
      <div className="calendar__table">
        {days.map((day, index) => (
          <div className="calendar__column" key={day.dayName}>
            <div className="calendar__headerRow">
              <div className="calendar__headerCell">
                <div>{day.dateString}</div>
                <div>{day.dayName}</div>
              </div>
            </div>
            <div className="calendar__row">
              <div className="calendar__headerCell">
                {events
                  .filter(
                    (event) =>
                      event.tourDateString === day.compareDate &&
                      event.date.getHours() <= 12
                  )
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((neededEvent, index) => EventsRow(neededEvent, index))}
              </div>
            </div>
            <div className="calendar__row">
              <div className="calendar__headerCell">
                {events
                  .filter(
                    (event) =>
                      event.tourDateString === day.compareDate &&
                      event.date.getHours() <= 17 &&
                      event.date.getHours() > 12
                  )
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((neededEvent, index) => EventsRow(neededEvent, index))}
              </div>
            </div>
            <div className="calendar__row">
              <div className="calendar__headerCell">
                {events
                  .filter(
                    (event) =>
                      event.tourDateString === day.compareDate &&
                      event.date.getHours() > 17
                  )
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((neededEvent, index) => EventsRow(neededEvent, index))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCalendar;
