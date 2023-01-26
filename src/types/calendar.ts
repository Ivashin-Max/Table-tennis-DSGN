import { ITournamentGet } from "./fetch";

export type CalendarEvent = {
  title: any;
  date: Date;
  tourDateString: string;
  tournamentInfo: ITournamentGet
}

export type CalendarDate = {
  compareDate: string;
  dateString: string;
  dayName: string;
  date: Date;
}