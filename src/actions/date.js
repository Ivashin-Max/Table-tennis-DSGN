import compareAsc from 'date-fns/compareAsc';
import addDays from 'date-fns/addDays'


export function checkDate(date) {
  const currentDay = new Date();
  // console.log('isLate?', compareAsc(new Date(date), currentDay))
  const checkDate = compareAsc(new Date(date), currentDay)
  // console.log(checkDate)
  if (checkDate === -1 || checkDate === 0) return true;
  return false
}



export function getTournamentDay(date, dayNameLength = 'short') {
  const inputDate = new Date(date).toLocaleDateString("ru-RU", { weekday: dayNameLength });
  return inputDate
}

export function getTournamentTime(date) {
  const inputDate = new Date(date).toLocaleDateString("ru-RU", { hour: "2-digit", minute: "2-digit" }).split(',')[1]
  return inputDate
}

export function getTournamentDate(date, monthNameLength = 'long') {
  const options = { day: 'numeric', month: monthNameLength };
  const inputDate = new Date(date).toLocaleDateString("ru-RU", options);
  return inputDate
}


export function getNextWeek() {
  const today = new Date();
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const nextDay = addDays(today, i);
    const day = {
      dateString: getTournamentDate(nextDay, 'numeric'),
      dayName: getTournamentDay(nextDay, 'short'),
      compareDate: getTournamentDate(nextDay),
      date: nextDay
    };
    weekDays.push(day)
  }
  return weekDays
}
