import React from "react";
import {FormControl, InputLabel, Select} from "@mui/material";
import {Control, Controller} from "react-hook-form";

type SelectInputProps = {
  placeholder: string;
  control: Control<any, any>;
  name: string;
  children: React.ReactNode[];
}
const SelectInput: React.FC<SelectInputProps> = ({placeholder, control, name, children}) => {
  return (
    <FormControl fullWidth={true} margin="normal">
      <InputLabel>{placeholder}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({field}) => (
          <Select {...field} >
            {children}
          </Select>
        )}
      />
    </FormControl>
  )
}

export default SelectInput;
