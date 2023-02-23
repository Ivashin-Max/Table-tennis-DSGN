import { getCurrentTournamentByQuery } from ".";
import { setAuth, setCalendarMode, setTable } from "../store/reducer";
import { localStorageUser } from "../types/localStorage";
import { getDivisionsInfo, getParticipants } from "./fetchDB";

import { profileInfo } from "./Profile/profileRequests";

export const initApp =
  (user: localStorageUser | null) => async (dispatch: any) => {
    await dispatch(getDivisionsInfo());
    const query = getCurrentTournamentByQuery();
    if (query) {
      try {
        await dispatch(
          setTable({
            neededDivisionId: query.div,
            neededTournamentId: query.tour,
            neededZone: query.zone,
          })
        );
        await dispatch(
          getParticipants(query.city, query.zone, query.div, query.tour)
        );

        await dispatch(setCalendarMode({ calendarMode: false }));
      } catch (error) {
        console.log("Err", error);
      }
    }
    if (user?.id) {
      await profileInfo(user.id)
        .then((res) => {
          dispatch(
            setAuth({
              isAuthorized: true,
              fio: res.data[0].fio,
              rate_value: res.data[0].rate_value,
              tournamentsId: res.data[0].tournaments,
              userInfo: res.data[0],
            })
          );
        })
        .catch((e) => console.log("Error:", e));
    }
  };
