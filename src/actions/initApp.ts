import { useLocation } from "react-router-dom"
import { setAuth, setCalendarMode, setTable } from "../store/reducer"
import { localStorageUser } from "../types/localStorage"
import { getDivisionsInfo, getParticipants } from "./fetchDB"

import { profileInfo } from "./Profile/profileRequests"

export const initApp = (user: (localStorageUser | null)) => async (dispatch: any) => {
  const location = window.location.search

  await dispatch(getDivisionsInfo())
  if (location) {

    try {
      const tourId = location.split('&')[0].split('=')[1]
      const divId = location.split('&')[1].split('=')[1]
      console.log(`нужен турнир ${tourId} в дивизионе ${divId}`)
      await dispatch(setTable({
        neededDivisionId: +divId,
        neededTournamentId: +tourId
      }))
      await dispatch(getParticipants(+tourId));

      await dispatch(setCalendarMode({ calendarMode: false }))

    } catch (error) {
      console.log('EEEEEEEEEEEEEEEEE', error)
    }


  }
  if (user?.id) {
    await profileInfo(user.id)
      .then(res => {

        dispatch(setAuth({
          isAuthorized: true, fio: res.data[0].fio, rate_value: res.data[0].rate_value,
          tournamentsId: res.data[0].tournaments,
          userInfo: res.data[0]

        }))
      })
      .catch(e => console.log(e.toJSON()))

  }

}