export const getCurrentTournamentByQuery = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const cityId = +params?.city;
  const zoneId = +params?.zone;
  const divId = +params?.division;
  const tourId = +params?.tournament;

  if (cityId && zoneId && divId && tourId) {
    return { city: cityId, zone: zoneId, div: divId, tour: tourId };
  } else return null;
};
