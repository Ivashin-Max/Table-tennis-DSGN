import { addHours } from "date-fns";

export const getCurrentTournamentByQuery = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const cityId = +params?.city;
  const zoneId = +params?.zone;
  const divId = +params?.division;
  const tourId = +params?.tournament;

  if (cityId && zoneId && divId && tourId) {
    return { city: cityId, zone: zoneId, div: divId, tour: tourId };
  } else return null;
};

export const dataFioFormat = (fio: string) => {
  return fio.replace(/ /g, "").toLowerCase();
};

export const converToMySqlDate = (date: Date | number | string) => {
  try {
    const tzoffset = new Date().getTimezoneOffset() * 60000;

    // @ts-ignore
    return new Date(date - tzoffset)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
  } catch {}
};

export const converFromMySqlDate = (date: Date | number | string) => {
  try {
    return addHours(new Date(date), -3);
  } catch {}
};
