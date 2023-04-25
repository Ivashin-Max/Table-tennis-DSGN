import { addHours } from "date-fns";
import { openModal } from "../store/reducer";

const PERSON_SVG =
  '<svg   viewBox="0 0 512 512" fill="#2B476A" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-j</title><path d="M332.64,64.58C313.18,43.57,286,32,256,32c-30.16,0-57.43,11.5-76.8,32.38-19.58,21.11-29.12,49.8-26.88,80.78C156.76,206.28,203.27,256,256,256s99.16-49.71,103.67-110.82C361.94,114.48,352.34,85.85,332.64,64.58Z"/><path d="M432,480H80A31,31,0,0,1,55.8,468.87c-6.5-7.77-9.12-18.38-7.18-29.11C57.06,392.94,83.4,353.61,124.8,326c36.78-24.51,83.37-38,131.2-38s94.42,13.5,131.2,38c41.4,27.6,67.74,66.93,76.18,113.75,1.94,10.73-.68,21.34-7.18,29.11A31,31,0,0,1,432,480Z"/></svg>';

const DIVISION_SVG = `<svg  xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
  <path d="M6 13.5V6C6 6 7.694 7.60046 9 7.5C10.1352 7.41268 11.5 6 11.5 6C11.5 6 12.8648 7.41268 14 7.5C15.306 7.60046 17 6 17 6V14C17 15 17 15.5 15 17.5C13 19.5 11.5 20 11.5 20C11.5 20 9.5 19 8 17.5C6.5 16 6 15 6 13.5Z" fill="#000000" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

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

export const findAndShowValidNames =
  (name: string, allNames: { fio: string; division: string }[]) =>
  (dispatch: any) => {
    const validNames = allNames.filter((participant) =>
      participant.fio.toLowerCase().includes(name.toLowerCase())
    );

    let searchText = "";
    for (let i = 0; i < validNames.length; i++) {
      const element = validNames[i];
      searchText += `<div class='DivisionsSearch__row'><div class='DivisionsSearch__person'>${PERSON_SVG}<span>${element.fio}</span></div> <div class='DivisionsSearch__division'>${DIVISION_SVG}<span>${element.division}</span></div></div>`;
    }

    if (!!searchText) {
      dispatch(
        openModal({
          title: "Успешно!",
          modalMsg: searchText,
        })
      );
    } else {
      dispatch(
        openModal({
          modalMsg: "Игрок с данным ФИО не найден",
        })
      );
    }
  };
