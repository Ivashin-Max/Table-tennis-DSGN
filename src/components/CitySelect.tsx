import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setDefaultCity } from "../actions/localStorage";
import { useCurrentCity } from "../hooks/useCurrentTournament";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { setCity } from "../store/reducer";
import { ICity } from "../types/fetch";

const CitySelect = () => {
  const dispatch = useDispatch();
  const [, setSearchParams] = useSearchParams();
  const cities: ICity[] = useTypedSelector(
    (state) => state.divisions
  ).divisions;
  const currentCity = useCurrentCity();
  const [city, setCityValue] = React.useState("");

  useEffect(() => {
    setCityValue(currentCity.id);
  }, [currentCity]);

  const handleChange = (event: SelectChangeEvent) => {
    setCityValue(event.target.value);
    setDefaultCity(event.target.value);
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
            <MenuItem value={city.id}>{city.city}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
    // <select onChange={handleChange}>
    //
    // </select>
  );
};

export default React.memo(CitySelect);
