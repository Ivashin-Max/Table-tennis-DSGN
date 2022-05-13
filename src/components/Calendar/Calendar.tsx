import { useEffect, useState } from 'react';


import { CalendarDate, CalendarEvent } from '../../types/calendar';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getNextWeek, getTournamentDate, getTournamentTime } from '../../actions/date';
import { getDivisionName } from '../../actions/divisions';
import { ReactComponent as PersonIcon } from '../../styles/img/personWhite.svg';
import { ReactComponent as StarIcon } from '../../styles/img/star-svgrepo-com.svg';

import Tooltip from 'rc-tooltip';
import { useDispatch } from 'react-redux';
import { setTable } from '../../store/reducer';
import { getParticipants } from '../../actions/fetchDB';
import classNames from 'classnames';




const alignConfig = {
  offset: [-15, 5],            // the offset sourceNode by 10px in x and 20px in y,
  targetOffset: [10, 85], // the offset targetNode by 30% of targetNode width in x and 40% of targetNode height in y,
  overflow: { adjustX: true, adjustY: true }, // auto adjust position when sourceNode is overflowed
};




const MyCalendar = ({ flipCard }: any) => {
  const allDivisions = useTypedSelector(state => state.divisions).divisions;
  const myTournamentsId = useTypedSelector<number[]>(state => state.auth.tournamentsId);
  const dispatch = useDispatch();
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [tournaments, setTournaments] = useState<any[]>([])
  const [days, setDays] = useState<CalendarDate[]>([])
  const checkMyTournament = () => {
    const res = events.filter(item => myTournamentsId.includes(item.tournamentInfo.id));
    // console.log(222222222222222222222, res);
  }


  let classNameEvent = classNames({
    'calendar__event': true,
    'calendar__myTournament': checkMyTournament()
  });

  const clickHandler = (tournament: any) => async () => {
    // console.log('tournament.division', tournament.division)
    await dispatch(setTable({
      neededDivisionId: tournament.division,
      neededTournamentId: tournament.id
    }))
    await dispatch(getParticipants(tournament.id));
    flipCard();
    // console.log('storeTable', storeTable)
  }





  const tournamentsToEvents = (tournaments: any[]) => {
    const eventsFromTournaments = tournaments.map(tournamet => {
      // console.log('tournamet', tournamet)
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

                {events.filter(event => (event.tourDateString === day.compareDate) && (event.date.getHours() <= 12))
                  .map((neededEvent, index) => (
                    <Tooltip placement="right" key={index}
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
                      <div className={classNameEvent} onClick={clickHandler(neededEvent.tournamentInfo)}>

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
                    <div className={classNameEvent} onClick={clickHandler(neededEvent.tournamentInfo)}>

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
                    <div className={classNameEvent} onClick={clickHandler(neededEvent.tournamentInfo)}>

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