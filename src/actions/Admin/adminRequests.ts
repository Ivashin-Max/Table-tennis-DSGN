import url from "../../static/url.json";
import axios from "axios";
import { getUser } from "../localStorage";
import { getDivisionsInfo } from "../fetchDB";
import {
  openModal,
  setLoading,
  setEmptyData,
  setData,
} from "../../store/reducer";
import {
  ILink,
  ILinksAdd,
  ITournamentAdd,
  ITournamentPatch,
  IParticipantGet,
} from "../../types/fetch";

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
        dispatch(getParticipantsLikeAdmin(tournamentId));
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

export const getParticipantsLikeAdmin =
  (tournamentId: number) => async (dispatch: any, getState: any) => {
    const userJWT = getUser().jwt;
    if (tournamentId === 0) {
      dispatch(setEmptyData());
    } else {
      dispatch(setLoading({ isLoading: true }));
      const currentTable = getState().table;
      try {
        const neededDivision = getState().divisions.divisions.find(
          (el: any) => el.id === currentTable.neededDivisionId
        );

        const neededTournament = neededDivision.tournaments.find(
          (el: any) => el.id === tournamentId
        );
        if (!neededDivision || !neededTournament) throw new Error("error");
        // console.log('neededTournament', neededTournament)
        const apiUrl =
          url.back +
          url.endpoints.admin.getParticipantsAdminLike +
          tournamentId;
        axios
          .get<IParticipantGet[]>(apiUrl, {
            headers: { Authorization: userJWT },
          })
          .then(({ data }) => {
            const date = new Date(neededTournament.date_time);
            const tableFio = data.filter((participant) => !participant.reserve);
            const tableZapas = data.filter(
              (participant) => participant.reserve
            );
            const tableDate = date.toLocaleDateString("ru-RU", {
              day: "2-digit",
              month: "2-digit",
            });
            const tableTime = date
              .toLocaleDateString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
              })
              .split(",")[1];

            dispatch(
              setData({
                tournamentPlace: neededTournament.location,
                tournamentTell: neededTournament.phone,
                tournamentRate: neededTournament.rating_range,
                tournamentPrice: neededTournament.cost,
                tournamentOrgFio: neededTournament.organizer,
                tournamentPrizes: neededTournament.prize,
                tableDivisionName: neededTournament.tournament_name,
                tableDate: tableDate,
                tableTime: tableTime,
                tableTotal: neededTournament.reserve,
                tableFio: tableFio,
                tableZapas: tableZapas,
                team: neededTournament.team,
                comment: neededTournament.comment,
              })
            );
          })
          .catch((e) => {
            console.log("Error:", e);
          });
      } catch (e) {
        dispatch(
          openModal({
            title: "Ошибка!",
            modalMsg: `Ошибка загрузки турнира по ссылке, выберите вручную`,
          })
        );
      }
      dispatch(setLoading({ isLoading: false }));
    }
  };
