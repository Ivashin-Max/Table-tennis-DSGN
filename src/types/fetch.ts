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
  division: string,
  location: string,
  organizer: string,
  phone: string,
  rating_range: string,
  reserve: number,
  tournament_name: string,
  team: number
}

export interface ITournamentPatch extends ITournamentAdd {
  tournament_id: number;
  dropParticipants: boolean
}