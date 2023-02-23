import url from "../static/url.json";
import axios from "axios";
import {
  openModal,
  setCity,
  setDivisions,
  setEmptyData,
  setLoading,
} from "../store/reducer.js";
import { setData } from "../store/reducer.js";
import { ILink, IParticipantAdd, IParticipantGet } from "../types/fetch";
import { UNSORTED_CITY } from "../components/MyHeader";

export const getDivisionsInfo = () => (dispatch: any) => {
  const apiUrl = url.back + url.endpoints.divisions;

  return axios
    .get(apiUrl)
    .then(({ data }) => {
      dispatch(setDivisions({ divisions: data }));

      const filteredCities = data.filter(
        (el: any) => el.city !== UNSORTED_CITY
      );

      dispatch(setCity({ city: filteredCities[0] }));
    })
    .catch((e) => {
      console.log(e.toJSON());
      dispatch(
        openModal({ title: "Ошибка!", modalMsg: `Ошибка начальной загрузки` })
      );
    });
};

export const getParticipants =
  (
    cityId?: number,
    zoneId?: number,
    divisionId?: number,
    tournamentId?: number
  ) =>
  async (dispatch: any, getState: any) => {
    if (tournamentId === 0) {
      dispatch(setEmptyData());
    } else {
      dispatch(setLoading({ isLoading: true }));

      try {
        const neededCity = getState().divisions.divisions.find(
          (el: any) => el.id === cityId
        );
        const neededZone = neededCity?.zones.find(
          (el: any) => el.id === zoneId
        );
        const neededDivision = neededZone?.divisions.find(
          (el: any) => el.id === divisionId
        );
        const neededTournament = neededDivision.tournaments.find(
          (el: any) => el.id === tournamentId
        );
        if (!neededCity || !neededZone || !neededDivision || !neededTournament)
          throw new Error("error");
        const apiUrl = url.back + url.endpoints.getParticipants + tournamentId;
        axios
          .get<IParticipantGet[]>(apiUrl)
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
        console.log(e);
      }
      dispatch(setLoading({ isLoading: false }));
    }
  };

export const addParticipant = async (participant: IParticipantAdd) => {
  const apiUrl = url.back + url.endpoints.addParticipant;

  return await axios.post(apiUrl, participant);
};

export const deleteParticipantDB = async (participant: IParticipantAdd) => {
  const apiUrl = url.back + url.endpoints.deleteParticipant;

  return await axios.delete(apiUrl, { data: participant });
};

export const getLinks = () => {
  const apiUrl = url.back + url.endpoints.links;

  return axios.get<ILink[]>(apiUrl);
};

export const getCoaches = (cityId: number) => {
  const apiUrl = url.back + url.endpoints.getCoaches + cityId;
  return axios.get(apiUrl);
};

export const getDivisionsStructure = async () => {
  const apiUrl = url.back + url.endpoints.divisionsStructure;
  let result = null;
  try {
    result = (await axios.get(apiUrl)).data;
  } catch (error) {
    console.error("getDivisionsStructure error", error);
  }

  return result;
};
