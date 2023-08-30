import { useForm, UseFormReturn } from "react-hook-form";

type SignInInput = {
  email: string;
  password: string;
};
export const useSignIn: () => UseFormReturn<SignInInput> = () => {
  return useForm<SignInInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
};
