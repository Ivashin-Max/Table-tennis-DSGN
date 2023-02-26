import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

import Autocomplete from "@mui/material/Autocomplete";
import { getRegistrationNames } from "../../../actions/Profile/profileRequests";
import { InputProps } from "../../../types/props";
import Typography from "../../Styled/Typography";
import { getCoaches } from "../../../actions/fetchDB";

const AutocompleteFio: React.FC<InputProps> = ({
  register,
  name,
  error,
  label,
  coachCityId,
  onlyAllowedOptions,
  ...rest
}) => {
  const [names, setNames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (coachCityId ? getCoaches(coachCityId) : getRegistrationNames())
      .then((res) => {
        setNames(res.data);
        setLoading(false);
      })
      .catch((res) => {
        console.warn("Ошибка загрузки", res.toJSON());
        setLoading(false);
      });
  }, [coachCityId]);

  return (
    <>
      <Autocomplete
        size="small"
        sx={{
          mb: 1,
          borderRadius: "2px", 
          width: "23.86rem",
          marginLeft: "-7px",
          '& input': {
            height: 25,
            width: "22.86rem",
            border: "1px solid #535e692a",
          },
          '& fieldset': {
            border: "0px",
          },
          '& label': {
            fontSize: "13px",
            lineHeight: "2em",
          },
        }}
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
            // <TextField {...props}  key={option.id} {...option.fio ?? option.name} label="Size small" placeholder="Favorites" />
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
            sx={{
              // boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.082)",
              // height: 1,
            }}
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
