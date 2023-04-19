import { useTypedSelector } from "./useTypedSelector";

export const useCurrentTournament = () => {
  let currentTournament = null;
  const currentTable = useTypedSelector((state) => state.table);
  const currentCity = useCurrentCity();

  if (currentCity) {
    const neededZone = currentCity.zones.find(
      (zone) => zone.id === currentTable.neededZone
    );
    if (neededZone) {
      const neededDivision = neededZone.divisions.find(
        (el) => el.id === currentTable.neededDivisionId
      );
      currentTournament = neededDivision?.tournaments.find(
        (el) => el.id === currentTable.neededTournamentId
      );
    }
  }
  return currentTournament;
};

export const useCurrentDivision = () => {
  let currentDivision = null;
  const currentTable = useTypedSelector((state) => state.table);

  const divisions = useTypedSelector((state) => state.divisions).divisions;
  if (currentTable.neededDivisionId) {
    currentDivision = divisions.find(
      (el) => el.id === currentTable.neededDivisionId
    );
  }

  return currentDivision;
};

export const useCurrentZoneAndDivision = () => {
  let currentZoneAndDivision = null;
  const currentTable = useTypedSelector((state) => state.table);
  const currentCity = useCurrentCity();

  const neededZone = currentCity?.zones?.find(
    (zone) => zone.id === currentTable.neededZone
  );
  if (neededZone) {
    const neededDivision = neededZone.divisions.find(
      (el) => el.id === currentTable.neededDivisionId
    );

    currentZoneAndDivision = { zone: neededZone, division: neededDivision };
  }

  return currentZoneAndDivision;
};

export const useCurrentCity = () => {
  const currentCity = useTypedSelector((state) => state.city).city;

  return currentCity;
};
