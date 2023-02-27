import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

import Autocomplete from "@mui/material/Autocomplete";
import { InputProps } from "../../../types/props";
import Typography from "../../Styled/Typography";

const AutocompleteFio: React.FC<InputProps> = ({
  register,
  name,
  error,
  label,
  coachCityId,
  onlyAllowedOptions,
  sx,
  refetchFlag,
  resetOptions,
  optionsFetch,
  ...rest
}) => {
  const [names, setNames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!optionsFetch) return;
    optionsFetch()
      .then((res: any) => {
        setNames(res.data);
        setLoading(false);
      })
      .catch((res: any) => {
        console.warn("Ошибка загрузки", res.toJSON());
        setLoading(false);
      });
  }, [refetchFlag, optionsFetch]);

  return (
    <>
      <Autocomplete
        size="small"
        sx={sx}
        // freeSolo
        key={coachCityId}
        freeSolo={!onlyAllowedOptions}
        loading={loading}
        noOptionsText={
          coachCityId
            ? "Тренера с таким ФИО нет в базе, попробуйте поменять город"
            : undefined
        }
        loadingText="Загрузка..."
        options={names}
        getOptionLabel={(option) => option.fio ?? option.name}
        renderOption={(props, option) => {
          return (
            <span {...props} key={option.id}>
              {option.fio ?? option.name}
            </span>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            autoComplete="off"
            {...register(name)}
            {...rest}
            label={label}
            // variant="standart"
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

export default React.memo(AutocompleteFio);
