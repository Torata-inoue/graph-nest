import { useForm, UseFormReturn } from "react-hook-form";

type SignUpType = {
  chatworkId: string;
  email: string;
  password: string;
};
export const useSignUp: () => UseFormReturn<SignUpType> = () => {
  return useForm<SignUpType>({
    defaultValues: {
      chatworkId: "",
      email: "",
      password: "",
    },
  });
};
