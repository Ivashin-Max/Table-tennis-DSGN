

export function checkDate(date, time) {
  const currentYear = new Date().getFullYear();
  const currentTime = new Date();
  const correctTimeFormat = `T${time.trim()}:00`
  const tournamentDate = new Date(`${currentYear}-${date.split('.').reverse().join('-')}${correctTimeFormat}`)
  console.groupCollapsed('%cПроверка даты', tournamentDate > currentTime ? 'color:green' : 'color:red')
  console.log('Дата турнира', tournamentDate);
  console.log('Текущая дата', currentTime);
  console.groupEnd();

  if (tournamentDate > currentTime) {
    return false
  }
  return true
}

export function getTournamentDay(date) {
  const currentYear = new Date().getFullYear();

  const tournamentDay = new Date(`${currentYear}/${date.split('.').reverse().join('/')}`).toLocaleDateString("ru-RU", { weekday: 'short' })
  // console.log('day', tournamentDay);

  return tournamentDay
}
