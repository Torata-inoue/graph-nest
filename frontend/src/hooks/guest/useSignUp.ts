import { useForm, UseFormReturn } from "react-hook-form";

type SignUpType = {
  name: string;
  email: string;
  password: string;
};
export const useSignUp: () => UseFormReturn<SignUpType> = () => {
  return useForm<SignUpType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
};
