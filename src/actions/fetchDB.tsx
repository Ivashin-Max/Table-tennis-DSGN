
import url from "../static/url.json"
import axios from 'axios';
import { setDivisions, setEmptyData } from '../store/reducer.js';
import { setData, setDateFlag } from '../store/reducer.js';
import { IParticipantAdd, IParticipantGet, ITournamentAdd } from '../types/fetch';
import { disconnect } from "process";




export const getDivisionsInfo = () => (dispatch: any) => {
  const apiUrl = url.back + url.endpoints.divisions;

  axios.get(apiUrl)
    .then(({ data }) => {
      console.log('Axios', data);
      dispatch(setDivisions({ divisions: data }))
    });
}

export const getParticipants = (tournamentId: number) => async (dispatch: any, getState: any) => {
  if (tournamentId === 0) {
    dispatch(setEmptyData());
  }
  else {
    const currentTable = getState().table;
    const neededDivision = getState().divisions.divisions.find((el: any) => el.id === currentTable.neededDivisionId);
    const neededTournament = neededDivision.tournaments.find((el: any) => el.id === tournamentId);
    // console.log('neededTournament', neededTournament)
    const apiUrl = url.back + url.endpoints.getParticipants + tournamentId
    await axios.get<IParticipantGet[]>(apiUrl)
      .then(({ data }) => {

        const date = new Date(neededTournament.date_time);
        const tableFio = data.filter((participant) => !participant.reserve)
        const tableZapas = data.filter((participant) => participant.reserve)
        const tableDate = date.toLocaleDateString("ru-RU", { day: '2-digit', month: "2-digit" })
        const tableTime = date.toLocaleDateString("ru-RU", { hour: "2-digit", minute: "2-digit" }).split(',')[1]

        dispatch(setData({
          tournamentPlace: neededTournament.location,
          tournamentTell: neededTournament.phone,
          tournamentRate: neededTournament.rating_range,
          tournamentPrice: neededTournament.cost,
          tournamentOrgFio: neededTournament.organizer,
          tableDivisionName: neededTournament.tournament_name,
          tableDate: tableDate,
          tableTime: tableTime,
          tableTotal: neededTournament.reserve,
          tableFio: tableFio,
          tableZapas: tableZapas,
          team: neededTournament.team
        }))
      });
  }

}

export const addParticipant = async (participant: IParticipantAdd) => {
  console.log('111111111111', url)
  const apiUrl = url.back + url.endpoints.addParticipant;
  let response = null;
  await axios.post(apiUrl, participant)
    .then(data => response = { success: true, data: data })
    .catch((error) => { response = { success: false, data: error.response.data } });

  return response
}

export const deleteParticipantDB = async (participant: IParticipantAdd) => {
  console.log(participant)
  const apiUrl = url.back + url.endpoints.deleteParticipant;
  let response = null;
  await axios.delete(apiUrl, { data: participant })
    .then(data => response = { success: true, data: data })
    .catch((error) => { response = { success: false, data: error.response.data } });

  return response
}

// export const addTournament = async (tournament: ITournamentAdd) => {
//   const apiUrl = url.back + url.endpoints.addTournament
//   let response = null;
//   await axios.post(apiUrl, tournament)
//     .then(data => response = { success: true, data: data })
//     .catch((error) => { response = { success: false, data: error.response.data } });

//   return response
// }