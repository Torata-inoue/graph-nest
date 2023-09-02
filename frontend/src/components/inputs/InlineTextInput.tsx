import React from "react";
import TextField from "@mui/material/TextField";
import {FieldError, UseFormRegisterReturn} from "react-hook-form";

type InlineTextInputProps = {
  placeholder: string;
  error: FieldError | undefined;
  register: UseFormRegisterReturn
}
const InlineTextInput: React.FC<InlineTextInputProps> = ({placeholder, error, register}) => {
  return (
    <TextField
      autoFocus
      margin="normal"
      label={placeholder}
      fullWidth
      required
      error={Boolean(error)}
      helperText={error?.message}
      {...register}
    />
  )
}

export default InlineTextInput;
