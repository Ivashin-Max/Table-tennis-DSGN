import { useSelector } from "react-redux"

export const useCurrentTournament = () => {
  let currentTournament = null;
  const currentTable = useSelector(state => state.table);

  const divisions = useSelector(state => state.divisions).divisions
  if (currentTable.neededDivisionId) {
    const neededDivision = divisions.find(el => el.id === currentTable.neededDivisionId)
    currentTournament = neededDivision.tournaments.find(el => el.id === currentTable.neededTournamentId);
  }
  return currentTournament;
}

export const useCurrentDivision = () => {
  let currentDivision = null;
  const currentTable = useSelector(state => state.table);

  const divisions = useSelector(state => state.divisions).divisions
  if (currentTable.neededDivisionId) {
    currentDivision = divisions.find(el => el.id === currentTable.neededDivisionId)
  }

  return currentDivision;
}