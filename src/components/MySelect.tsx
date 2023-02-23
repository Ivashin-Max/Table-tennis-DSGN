import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
} from "@mui/material";
import React, { useEffect } from "react";

interface SelectProps {
  options: { value: string | number; text: string }[] | undefined;
  changeCallback: (value: string) => void;
  label?: string;
  pushedValue?: string | number | undefined;
}
const MySelect: React.FC<SelectProps> = ({
  options,
  changeCallback,
  label,
  pushedValue,
}) => {
  const [value, setValue] = React.useState("");

  const handleUpdate = (value: string, pushedValue?: boolean) => {
    setValue(value);
    !pushedValue && changeCallback(value);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    handleUpdate(value);
  };

  useEffect(() => {
    const index = options?.findIndex((option) => option.value === pushedValue);
    if (index !== -1 && pushedValue) handleUpdate(pushedValue.toString(), true);
  }, [options]);

  return (
    <>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        {label && <InputLabel id="Selectlabel">{label}</InputLabel>}
        <Select value={value} onChange={handleChange} labelId="Selectlabel">
          {options?.map((option) => (
            <MenuItem value={option.value} key={option.value}>
              {option.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default React.memo(MySelect);
