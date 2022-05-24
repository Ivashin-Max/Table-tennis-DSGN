export interface IParticipantAdd {
  tournamentId: number,
  name: string,
  name_2: string,
  password: string
}



export interface IAdminParticipantDelete {
  tournamentId: number,
  name: string
}

export interface IParticipantGet {
  name: string,
  name_2?: string,
  rating: number,
  reserve?: boolean
}

export interface ITournamentAdd {
  cost: number,
  date_time: any,
  division: string | number,
  location: string,
  organizer: string,
  phone: string,
  rating_range: string,
  reserve: number | string,
  tournament_name: string,
  team: number,
  prize: string | null
}

export type DivisionsName = "Первый" | "Второй" | "Третий" | "Высший" | "Свободный";

export interface ITournamentGet extends ITournamentAdd {
  count: number
  id: number
}


export interface ITournamentPatch extends ITournamentAdd {
  tournament_id: number;
  dropParticipants: boolean
}



export interface IProfileGet {
  0: {
    birth_year: string
    fio: string
    id: number
    is_payed: number
    payment_date: null | string
    play_comment: null | string
    play_status_1d: 0
    play_status_2d: 0
    play_status_3d: 0
    play_status_etc: 0
    play_status_vd: 0
    rate_time: string
    rate_value: number
    rttf_id: number
    telegramId: null | string
    text_comment: null | string
    value: null | string,
    tournaments: number[]
  }

}

export interface ILinksAdd {
  link: string
  title: string
}

export interface ILink extends ILinksAdd {
  id: number
}