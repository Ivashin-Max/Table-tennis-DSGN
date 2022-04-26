import React, { useEffect, useState } from 'react';


import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import { ru } from "date-fns/locale";
import addHours from 'date-fns/addHours'
import startOfHour from 'date-fns/startOfHour'
import { useAllTournaments } from '../../hooks/useAllTournaments';
import { ITournamentGet } from '../../types/fetch';
import { CalendarDate, CalendarEvent } from '../../types/calendar';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getNextWeek, getTournamentDate, getTournamentDay, getTournamentTime } from '../../actions/date';
import Title from '../Styled/Title';
import { getDivisionName } from '../../actions/divisions';
import { ReactComponent as PersonIcon } from '../../styles/img/personWhite.svg';
import { ReactComponent as StarIcon } from '../../styles/img/star-svgrepo-com.svg';

import Tooltip from 'rc-tooltip';
import { useDispatch } from 'react-redux';
import { setTable } from '../../store/reducer';
import { getParticipants } from '../../actions/fetchDB';


const now = new Date()

const endOfHour = (date: Date) => addHours(startOfHour(date), 1)
const start = endOfHour(now)
const end = addHours(start, 2)


const alignConfig = {
  offset: [-15, 5],            // the offset sourceNode by 10px in x and 20px in y,
  targetOffset: [10, 85], // the offset targetNode by 30% of targetNode width in x and 40% of targetNode height in y,
  overflow: { adjustX: true, adjustY: true }, // auto adjust position when sourceNode is overflowed
};




const MyCalendar = () => {
  const allDivisions = useTypedSelector(state => state.divisions).divisions;
  const qqq = useTypedSelector(state => state);
  const dispatch = useDispatch();
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [tournaments, setTournaments] = useState<any[]>([])
  const [days, setDays] = useState<CalendarDate[]>([])

  const clickHandler = (tournament: any) => async () => {
    // console.log('tournament.division', tournament.division)
    await dispatch(setTable({
      neededDivisionId: tournament.division,
      neededTournamentId: tournament.id
    }))
    await dispatch(getParticipants(tournament.id));
    // console.log('storeTable', storeTable)
  }





  const tournamentsToEvents = (tournaments: any[]) => {
    const eventsFromTournaments = tournaments.map(tournamet => {
      console.log('tournamet', tournamet)
      const tourDate = new Date(tournamet.date_time)
      const tourDateString = getTournamentDate(new Date(tournamet.date_time))
      const tourTitle = tournamet.tournament_name;
      const event = { title: tourTitle, date: tourDate, tourDateString: tourDateString, tournamentInfo: tournamet }
      // console.log(event)
      return event
    })
    return eventsFromTournaments
  }

  useEffect(() => {

    const nextWeek = getNextWeek();
    console.log(nextWeek)
    setDays(nextWeek)

  }, [])


  useEffect(() => {
    if (allDivisions) {
      const allTours = [];
      for (let i = 0; i < allDivisions.length; i++) {
        const element = allDivisions[i];
        allTours.push(...element.tournaments)

      }
      setTournaments(allTours)
    }
  }, [allDivisions])

  useEffect(() => {
    const events = tournamentsToEvents(tournaments);
    if (tournaments) {
      setEvents(events)
    }
  }, [tournaments])


  return (
    <div className="calendar__wrapper">

      <div className="calendar__table">
        {days.map(day => (
          <div className="calendar__column">
            <div className="calendar__headerRow">
              <div className="calendar__headerCell">
                <div>{day.dateString}</div>
                <div>{day.dayName}</div>
              </div>
            </div>
            <div className="calendar__row">
              <div className="calendar__headerCell">

                {events.filter(event => (event.tourDateString === day.compareDate) && (event.date.getHours() <= 12)).map(neededEvent => (
                  <Tooltip placement="right"
                    overlay={
                      <>
                        <div>
                          <div className="calender__tooltipRow">
                            Дивизион: {getDivisionName(neededEvent.tournamentInfo.division, allDivisions)}
                          </div>
                          <div className="calender__tooltipRow">
                            Цена: {neededEvent.tournamentInfo.cost}
                          </div>
                          <div className="calender__tooltipRow">
                            Локейшн: {neededEvent.tournamentInfo.location}
                          </div>
                          <div className="calender__tooltipRow">
                            Рейтинг: {neededEvent.tournamentInfo.rating_range}
                          </div>
                          <div className="calender__tooltipRow">
                            Название: {neededEvent.tournamentInfo.tournament_name}
                          </div>
                          <div className="calender__tooltipRow">
                            Дата:  {getTournamentDate(neededEvent.tournamentInfo.date_time)}
                          </div>
                          <div className="calender__tooltipRow">
                            Время: {getTournamentTime(neededEvent.tournamentInfo.date_time)}
                          </div>



                        </div>
                      </>
                    }
                    trigger={['hover']} mouseLeaveDelay={0} align={alignConfig}
                  >
                    <div className="calendar__event" onClick={clickHandler(neededEvent.tournamentInfo)}>

                      <div>{getTournamentTime(neededEvent.tournamentInfo.date_time)}
                        <PersonIcon className='person' />                      {neededEvent.tournamentInfo.count}</div>
                      <div><StarIcon className='svg__star_table svg__star' />{neededEvent.tournamentInfo.rating_range}</div>


                    </div>
                  </Tooltip>
                ))}
              </div>
            </div>
            <div className="calendar__row">
              <div className="calendar__headerCell">
                {events.filter(event => (event.tourDateString === day.compareDate) && (event.date.getHours() <= 17 && event.date.getHours() > 12)).map(neededEvent => (

                  <Tooltip placement="right"
                    overlay={
                      <>
                        <div>
                          <div className="calender__tooltipRow">
                            Дивизион: {getDivisionName(neededEvent.tournamentInfo.division, allDivisions)}
                          </div>
                          <div className="calender__tooltipRow">
                            Цена: {neededEvent.tournamentInfo.cost}
                          </div>
                          <div className="calender__tooltipRow">
                            Локейшн: {neededEvent.tournamentInfo.location}
                          </div>
                          <div className="calender__tooltipRow">
                            Рейтинг: {neededEvent.tournamentInfo.rating_range}
                          </div>
                          <div className="calender__tooltipRow">
                            Название: {neededEvent.tournamentInfo.tournament_name}
                          </div>
                          <div className="calender__tooltipRow">
                            Дата:  {getTournamentDate(neededEvent.tournamentInfo.date_time)}
                          </div>
                          <div className="calender__tooltipRow">
                            Время: {getTournamentTime(neededEvent.tournamentInfo.date_time)}
                          </div>



                        </div>
                      </>
                    }
                    trigger={['hover']} mouseLeaveDelay={0} align={alignConfig}
                  >
                    <div className="calendar__event" onClick={clickHandler(neededEvent.tournamentInfo)}>

                      <div>{getTournamentTime(neededEvent.tournamentInfo.date_time)}
                        <PersonIcon className='person' />                      {neededEvent.tournamentInfo.count}</div>
                      <div><StarIcon className='svg__star_table svg__star' />{neededEvent.tournamentInfo.rating_range}</div>


                    </div>
                  </Tooltip>
                ))}

              </div>
            </div>
            <div className="calendar__row">
              <div className="calendar__headerCell">

                {events.filter(event => (event.tourDateString === day.compareDate) && (event.date.getHours() > 17)).map(neededEvent => (
                  <Tooltip placement="right"
                    overlay={
                      <>
                        <div>
                          <div className="calender__tooltipRow">
                            Дивизион: {getDivisionName(neededEvent.tournamentInfo.division, allDivisions)}
                          </div>
                          <div className="calender__tooltipRow">
                            Цена: {neededEvent.tournamentInfo.cost}
                          </div>
                          <div className="calender__tooltipRow">
                            Локейшн: {neededEvent.tournamentInfo.location}
                          </div>
                          <div className="calender__tooltipRow">
                            Рейтинг: {neededEvent.tournamentInfo.rating_range}
                          </div>
                          <div className="calender__tooltipRow">
                            Название: {neededEvent.tournamentInfo.tournament_name}
                          </div>
                          <div className="calender__tooltipRow">
                            Дата:  {getTournamentDate(neededEvent.tournamentInfo.date_time)}
                          </div>
                          <div className="calender__tooltipRow">
                            Время: {getTournamentTime(neededEvent.tournamentInfo.date_time)}
                          </div>



                        </div>
                      </>
                    }
                    trigger={['hover']} mouseLeaveDelay={0} align={alignConfig}
                  >
                    <div className="calendar__event" onClick={clickHandler(neededEvent.tournamentInfo)}>

                      <div>{getTournamentTime(neededEvent.tournamentInfo.date_time)}
                        <PersonIcon className='person' />                      {neededEvent.tournamentInfo.count}</div>
                      <div><StarIcon className='svg__star_table svg__star' />{neededEvent.tournamentInfo.rating_range}</div>


                    </div>
                  </Tooltip>
                ))}
              </div>
            </div>

          </div>

        ))}
      </div>

    </div>

  )
}

export default MyCalendar