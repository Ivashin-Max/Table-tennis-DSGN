

export function checkDate(date, time) {
  const currentYear = new Date().getFullYear();
  const currentTime = new Date();
  const correctTimeFormat = `T${time.trim()}:00`
  const tournamentDate = new Date(`${currentYear}-${date.split('.').reverse().join('-')}${correctTimeFormat}`)
  console.log(tournamentDate);
  console.log(currentTime);
  console.log(tournamentDate > currentTime ? 'турнир ещё не прошёл' : 'турнир уже прошёл');
  if (tournamentDate > currentTime) {
    return false
  }
  return true
}

export function getTournamentDay(date) {
  const inputDate = new Date(date).toLocaleDateString("ru-RU", { weekday: 'short' });
  return inputDate
}

export function getTournamentDate(date) {
  const options = { day: 'numeric', month: 'long' };
  const inputDate = new Date(date).toLocaleDateString("ru-RU", options);
  return inputDate
}
