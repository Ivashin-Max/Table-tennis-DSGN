

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
  const currentYear = new Date().getFullYear();

  const inputDate = new Date(date).toLocaleDateString("ru-RU", { weekday: 'short' });
  console.log('inputDate', inputDate);

  return inputDate
}
// function getDayName(dateStr, locale)
// {
//     var date = new Date(dateStr);
//     return date.toLocaleDateString(locale, { weekday: 'long' });
// }

// var dateStr = '05/23/2014';
// var day = getDayName(dateStr, "nl-NL");