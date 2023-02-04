import url from "../../static/url.json";
import axios from "axios";
import { getUser } from "../localStorage";
import { getDivisionsInfo, getParticipants } from "../fetchDB";
import { openModal, setLoading } from "../../store/reducer";
import {
  ILink,
  ILinksAdd,
  ITournamentAdd,
  ITournamentPatch,
} from "../../types/fetch";
import { NewCoachValues } from "../../types/forms";

export const deleteParticipantAdmin =
  (name: string, tournamentId: number) => async (dispatch: any) => {
    const userJWT = getUser().jwt;
    dispatch(setLoading({ isLoading: true }));
    const participant = {
      tournamentId: tournamentId,
      name: name,
    };
    const apiUrl = url.back + url.endpoints.admin.deleteParticipant;
    let response = null;
    axios
      .delete(apiUrl, {
        data: participant,
        headers: { Authorization: userJWT },
      })
      .then((data) => {
        response = { success: true, data: data };
        dispatch(getParticipants(tournamentId));
        dispatch(getDivisionsInfo());
      })
      .then(() => {
        dispatch(
          openModal({
            title: "Успешно",
            modalMsg: "Успешное удаление",
          })
        );
      })
      .catch((e) => {
        dispatch(
          openModal({
            title: "Ошибка",
            modalMsg: e.message,
          })
        );
      })

      .catch((error) => {
        response = { success: false, data: error.response.data };
      });

    return response;
  };

export const addTournament = async (tournament: ITournamentAdd) => {
  const userJWT = getUser().jwt;

  console.log("tournamentToAdd", tournament);
  const apiUrl = url.back + url.endpoints.admin.addTournament;
  return await axios.post(apiUrl, tournament, {
    headers: { Authorization: userJWT },
  });
};

export const patchTournament = async (tournament: ITournamentPatch) => {
  const userJWT = getUser().jwt;

  console.log("tournamentToPatch", tournament);
  const apiUrl = url.back + url.endpoints.admin.patchTournament;
  return await axios.patch(apiUrl, tournament, {
    headers: { Authorization: userJWT },
  });
};

export const deleteTournament = async (tournamentId: number) => {
  const userJWT = getUser().jwt;

  const apiUrl =
    url.back + url.endpoints.admin.deleteTournament + tournamentId.toString();
  return await axios.delete(apiUrl, {
    headers: { Authorization: userJWT },
  });
};

export const addLink = (link: ILinksAdd) => {
  const userJWT = getUser().jwt;

  const apiUrl = url.back + url.endpoints.links;
  return axios.post(apiUrl, link, {
    headers: { Authorization: userJWT },
  });
};

export const patchLink = async (link: ILink) => {
  const userJWT = getUser().jwt;
  const apiUrl = url.back + url.endpoints.links;
  return await axios.patch(apiUrl, link, {
    headers: { Authorization: userJWT },
  });
};

export const deleteLink = (linkId: number) => {
  const userJWT = getUser().jwt;

  const apiUrl = url.back + url.endpoints.admin.deleteLink + linkId;
  return axios.delete(apiUrl, {
    headers: { Authorization: userJWT },
  });
};

export const deleteCoach = (coachId: number) => {
  const userJWT = getUser().jwt;

  const apiUrl = url.back + url.endpoints.admin.deleteCoach + coachId;

  return axios.delete(apiUrl, { headers: { Authorization: userJWT } });
};

export const addCoach = (coach: NewCoachValues) => {
  const userJWT = getUser().jwt;

  const apiUrl = url.back + url.endpoints.admin.addCoach;
  return axios.post(apiUrl, coach, {
    headers: { Authorization: userJWT },
  });
};
