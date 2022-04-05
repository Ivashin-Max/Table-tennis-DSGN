import url from "../../static/url.json"
import axios from 'axios';
import { IAdminParticipantDelete } from "../../types/fetch";
import { getUser } from "../localStorage";
import { useCurrentTournament } from "../../hooks/useCurrentTournament";
import { getParticipants } from "../fetchDB";
import { useDispatch } from "react-redux";


export const deleteParticipantAdmin = async (name: string, tournamentId: number, dispatch: any) => {
  const userJWT = getUser().jwt;

  const participant = {
    tournamentId: tournamentId,
    name: name
  }
  const apiUrl = url.back + url.endpoints.admin.deleteParticipant;
  console.log(9999)
  let response = null;
  await axios.delete(apiUrl, {
    data: participant,
    headers: { Authorization: userJWT }
  })
    .then(async (data) => {
      response = { success: true, data: data }
      await dispatch(getParticipants(tournamentId))
    })

    .catch((error) => { response = { success: false, data: error.response.data } });

  return response
}