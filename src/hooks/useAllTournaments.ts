import { useTypedSelector } from "./useTypedSelector";

export const useAllTournaments = () => {
  const allCities = useTypedSelector((state) => state.divisions.divisions);
  const allTournaments = allCities
    .map((city: any) => city.zones)
    .flat()
    .map((zone: any) => zone.divisions)
    .flat()
    .map((division: any) => division.tournaments)
    .flat();

  return allTournaments;
};

export const useExactTournaments = (tournamentsId: number[]) => {
  const allTournaments = useAllTournaments();
  if (!tournamentsId) return [];
  const neededTournaments: any[] = [];

  tournamentsId.forEach((id) => {
    const neededTournament = allTournaments.find((el: any) => el.id === id);
    if (neededTournament) neededTournaments.push(neededTournament);
  });

  return neededTournaments;
};
