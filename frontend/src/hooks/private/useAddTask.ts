import { useForm, UseFormReturn } from "react-hook-form";

type AddTaskInputType = {
  name: string;
  dueDate: string;
  description: string;
  userId: number;
};
export const useAddTask: (userId: number) => UseFormReturn<AddTaskInputType> = (
  userId,
) => {
  return useForm<AddTaskInputType>({
    defaultValues: {
      name: "",
      dueDate: "",
      description: "",
      userId,
    },
  });
};
