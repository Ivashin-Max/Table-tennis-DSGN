import { addHours } from "date-fns";
import { scrollIntoView } from "seamless-scroll-polyfill";

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

export const findAndShowValidNames = (name: string) => {
  const dataFio = dataFioFormat(name);
  document
    .querySelectorAll(`[data-fio]`)
    .forEach((el) => el.classList.remove("validSearch"));
  document
    .querySelectorAll(`[data-fio='${dataFio}']`)
    .forEach((el) => el.classList.add("validSearch"));

  const firstValidName = document.querySelector(`[data-fio='${dataFio}']`);
  firstValidName &&
    scrollIntoView(firstValidName, {
      behavior: "smooth",
      block: "end",
      inline: "end",
    });
};
