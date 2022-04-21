import { setAuth } from "../store/reducer"
import { getDivisionsInfo } from "./fetchDB"

import { profileInfo } from "./Profile/profileRequests"

export const initApp = (user: any) => async (dispatch: any, getState: any) => {

  console.log('userRRR', user)
  await dispatch(getDivisionsInfo())
  if (user?.id) {
    await profileInfo(user.id)
      .then(res => {

        dispatch(setAuth({
          isAuthorized: true, fio: res.data[0].fio, rate_value: res.data[0].rate_value,
          tournamentsId: res.data[0].tournaments,
          userInfo: res.data[0]

        }))
      })

  }
}