import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

import Autocomplete from "@mui/material/Autocomplete";
import { InputProps } from "../../../types/props";
import Typography from "../../Styled/Typography";
import { useFormCoaches } from "../../../context/FormContext";

const AutocompleteCategory: React.FC<InputProps> = ({
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
  defaultOptions,
  noOptionsText,
  pushedValue,
  ...rest
}) => {
  const [names, setNames] = useState<any[]>([]);
  const context = useFormCoaches();
  const [val, setVal] = useState({ value: "", text: "" });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!optionsFetch) return;

    optionsFetch()
      .then((res: any) => {
        setNames(res.data);
        setLoading(false);
        if (context) {
          context.updateCoaches(res.data);
        }
      })
      .catch((res: any) => {
        console.warn("Ошибка загрузки", res);
        setLoading(false);
      });
  }, [refetchFlag, optionsFetch]);

  useEffect(() => {
    if (defaultOptions) {
      setNames(defaultOptions);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (pushedValue) setVal(pushedValue);
  }, [pushedValue]);

  return (
    <>
      <Autocomplete
        size="small"
        sx={sx}
        value={val}
        onChange={(_event, value) => setVal(value)}
        // freeSolo
        key={coachCityId}
        freeSolo={!onlyAllowedOptions}
        loading={loading}
        noOptionsText={noOptionsText}
        loadingText="Загрузка..."
        options={names}
        getOptionLabel={(option) => option.fio ?? option.name ?? option.text}
        isOptionEqualToValue={(option: any, value: any) => {
          if (value.id) return value.id === option.id;
          else return value.value === option.value;
        }}
        renderOption={(props, option) => {
          return (
            <span {...props} key={option.id ?? option.value}>
              {option.fio ?? option.name ?? option?.text}
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

export default React.memo(AutocompleteCategory);
