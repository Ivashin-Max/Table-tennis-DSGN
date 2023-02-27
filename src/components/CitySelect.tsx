import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setDefaultCity } from "../actions/localStorage";
import { useCurrentCity } from "../hooks/useCurrentTournament";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { setCalendarMode, setCity, setEmptyData } from "../store/reducer";
import { ICity } from "../types/fetch";

const CitySelect = () => {
  const dispatch = useDispatch();
  const [, setSearchParams] = useSearchParams();
  const cities: ICity[] = useTypedSelector(
    (state) => state.divisions
  ).divisions;
  const currentCity = useCurrentCity();
  const [city, setCityValue] = useState("");

  useEffect(() => {
    setCityValue(currentCity.id);
    dispatch(setCalendarMode({ calendarMode: true }));
    dispatch(setEmptyData());
  }, [currentCity]);

  const handleChange = (event: SelectChangeEvent) => {
    const cityId = event.target.value;
    setCityValue(cityId);
    setDefaultCity(cityId);
    setSearchParams({ city: cityId });
  };

  useEffect(() => {
    if (!city) return;

    const neededCity = cities.find((el: ICity) => el.id === +city);
    if (neededCity) dispatch(setCity({ city: neededCity }));
  }, [city]);

  return (
    <>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select value={city} onChange={handleChange}>
          {cities?.map((city: ICity) => (
            <MenuItem value={city.id} key={city.id}>
              {city.city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default React.memo(CitySelect);
