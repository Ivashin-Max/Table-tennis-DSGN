import { useTypedSelector } from "./useTypedSelector";

export const useCurrentTournament = () => {
  let currentTournament = null;
  const currentTable = useTypedSelector(state => state.table);

  const divisions = useTypedSelector(state => state.divisions)?.divisions
  if (divisions) {
    if (currentTable.neededDivisionId) {
      // console.log('TEST', divisions)
      const neededDivision = divisions.find(el => el.id === currentTable.neededDivisionId)
      currentTournament = neededDivision?.tournaments.find(el => el.id === currentTable.neededTournamentId);
    }
  }
  return currentTournament;
}

export const useCurrentDivision = () => {
  let currentDivision = null;
  const currentTable = useTypedSelector(state => state.table);

  const divisions = useTypedSelector(state => state.divisions).divisions
  if (currentTable.neededDivisionId) {
    currentDivision = divisions.find(el => el.id === currentTable.neededDivisionId)
  }

  return currentDivision;
}