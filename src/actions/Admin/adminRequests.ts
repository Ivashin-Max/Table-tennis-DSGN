import url from "../../static/url.json"
import axios from 'axios';
import { getUser } from "../localStorage";
import { getParticipants } from "../fetchDB";
import { openModal } from "../../store/reducer";
import { ITournamentAdd, ITournamentPatch } from "../../types/fetch";


export const deleteParticipantAdmin = (name: string, tournamentId: number,) => async (dispatch: any) => {
  const userJWT = getUser().jwt;

  const participant = {
    tournamentId: tournamentId,
    name: name
  }
  const apiUrl = url.back + url.endpoints.admin.deleteParticipant;
  console.log(9999)
  let response = null;
  axios.delete(apiUrl, {
    data: participant,
    headers: { Authorization: userJWT }
  })
    .then(data => {
      response = { success: true, data: data }
      dispatch(getParticipants(tournamentId))
    })
    .then(() => {
      dispatch(openModal({
        title: 'Успешно',
        modalMsg: 'Успешное удаление'
      }))
    })
    .catch((e) => {
      dispatch(openModal({
        title: 'Ошибка',
        modalMsg: e.message
      }))
    })

    .catch((error) => { response = { success: false, data: error.response.data } });

  return response
}

export const addTournament = async (tournament: ITournamentAdd) => {
  const userJWT = getUser().jwt;

  console.log('tournamentToAdd', tournament)
  const apiUrl = url.back + url.endpoints.admin.addTournament;
  return await axios.post(apiUrl, tournament, {
    headers: { Authorization: userJWT }
  })
}

export const patchTournament = async (tournament: ITournamentPatch) => {
  const userJWT = getUser().jwt;

  console.log('tournamentToPatch', tournament)
  const apiUrl = url.back + url.endpoints.admin.patchTournament;
  return await axios.patch(apiUrl, tournament, {
    headers: { Authorization: userJWT }
  })
}

export const deleteTournament = async (tournamentId: number) => {
  const userJWT = getUser().jwt;

  const apiUrl = url.back + url.endpoints.admin.deleteTournament + tournamentId.toString();
  return await axios.delete(apiUrl, {
    headers: { Authorization: userJWT }
  })
}