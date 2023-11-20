import React, { HTMLInputTypeAttribute } from "react";
import TextField from "@mui/material/TextField";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InlineTextInputProps = {
  placeholder: string;
  error: FieldError | undefined;
  register: UseFormRegisterReturn;
  type?: HTMLInputTypeAttribute;
  width?: `${number}%`;
};
const InlineTextInput: React.FC<InlineTextInputProps> = ({
  placeholder,
  error,
  register,
  type = "text",
  width = "100%",
}) => {
  return (
    <TextField
      autoFocus
      margin="normal"
      label={placeholder}
      required
      error={Boolean(error)}
      helperText={error?.message}
      type={type}
      sx={{ width }}
      {...register}
    />
  );
};

export default InlineTextInput;
