import React, {HTMLInputTypeAttribute} from "react";
import TextField from "@mui/material/TextField";
import {FieldError, UseFormRegisterReturn} from "react-hook-form";

type InlineTextInputProps = {
  placeholder: string;
  error: FieldError | undefined;
  register: UseFormRegisterReturn;
  type?: HTMLInputTypeAttribute;
}
const InlineTextInput: React.FC<InlineTextInputProps> = ({placeholder, error, register, type = 'text'}) => {
  return (
    <TextField
      autoFocus
      margin="normal"
      label={placeholder}
      fullWidth
      required
      error={Boolean(error)}
      helperText={error?.message}
      type={type}
      {...register}
    />
  )
}

export default InlineTextInput;
