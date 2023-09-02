import React from "react";
import {FormControl, InputLabel, Select} from "@mui/material";
import {Control, Controller} from "react-hook-form";

type SelectInputProps = {
  placeholder: string;
  control: Control<any, any>;
  children: React.ReactNode[];
}
const SelectInput: React.FC<SelectInputProps> = ({placeholder, control, children}) => {
  return (
    <FormControl fullWidth={true} margin="normal">
      <InputLabel>{placeholder}</InputLabel>
      <Controller
        name="status"
        control={control}
        render={({field}) => (
          <Select {...field}>
            {children}
          </Select>
        )}
      />
    </FormControl>
  )
}

export default SelectInput;
