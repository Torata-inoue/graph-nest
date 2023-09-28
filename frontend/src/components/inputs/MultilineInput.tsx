import React from "react";
import TextField from "@mui/material/TextField";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type MultilineTextInputProps = {
  placeholder: string;
  error?: FieldError | undefined;
  register: UseFormRegisterReturn;
};
const MultilineInput: React.FC<MultilineTextInputProps> = ({
  placeholder,
  error,
  register,
}) => {
  return (
    <TextField
      autoFocus
      margin="normal"
      label={placeholder}
      fullWidth
      multiline
      rows={4}
      error={Boolean(error)}
      helperText={error?.message}
      {...register}
    />
  );
};

export default MultilineInput;
