import React from "react";
import TextField from "@mui/material/TextField";

import Autocomplete from "@mui/material/Autocomplete";
import { InputCity, InputCityOption } from "../../../types/props";
import Typography from "../../Styled/Typography";

const AutocompleteCity: React.FC<InputCity> = ({
  register,
  name,
  error,
  label,
  onlyAllowedOptions,
  sx,
  options,
  changeCallback,
  ...rest
}) => {
  return (
    <>
      <Autocomplete
        size="small"
        sx={sx}
        freeSolo={!onlyAllowedOptions}
        noOptionsText={"Выберите город из предложенных"}
        loadingText="Загрузка..."
        options={options}
        getOptionLabel={(option) => option.text}
        isOptionEqualToValue={(
          option: InputCityOption,
          value: InputCityOption
        ) => value.value === option.value}
        renderOption={(props, option) => {
          return (
            <span {...props} key={option.value}>
              {option.text}
            </span>
          );
        }}
        onChange={(e: any, i: any) => {
          changeCallback(i);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            autoComplete="off"
            {...register(name)}
            {...rest}
            label={label}
          />
        )}
      />
      {error && (
        <Typography align="left" color="red" fz="12px">
          {error}
        </Typography>
      )}
    </>
  );
};

export default React.memo(AutocompleteCity);
