import { useTypedSelector } from "./useTypedSelector";


export const useAllTournaments = () => {
  const allDivisions = useTypedSelector(state => state.divisions.divisions);
  const allTournaments: any[] = [];

  if (allDivisions) {
    for (let i = 0; i < allDivisions.length; i++) {
      const element = allDivisions[i];
      allTournaments.push(...element.tournaments)
    }

  }



  return allTournaments
}

export const useExactTournaments = (tournamentsId: number[]) => {

  const allTournaments = useAllTournaments();
  console.log(5, allTournaments)
  if (!tournamentsId) return [];
  const neededTournaments: any[] = [];

  tournamentsId.forEach(id => {
    const neededTournament = allTournaments.find(el => el.id === id)
    if (neededTournament) neededTournaments.push(neededTournament)
  })
  // console.log(5, neededTournaments)

  return neededTournaments
}




