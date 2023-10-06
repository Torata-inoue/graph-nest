import { useForm, UseFormReturn } from "react-hook-form";
import { TaskInputType } from "./useAddTask.ts";

export const useEditTask: (userId: number) => UseFormReturn<TaskInputType> = (
  userId,
) => {
  return useForm<TaskInputType>({
    defaultValues: {
      name: "",
      body: "",
      userId,
      isTask: false,
      to: "",
      dueTime: 10,
      isEveryday: false,
    },
  });
};
