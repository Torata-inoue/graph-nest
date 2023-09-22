import { useForm, UseFormReturn } from "react-hook-form";

type AddTaskInputType = {
  name: string;
  body: string;
  userId: number;
  isTask: boolean;
  to: string;
  dueTime: number;
  isEveryday: boolean;
  dayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  date?: number;
  roomId: number;
  limitDate?: number;
  limitHour?: number;
};
export const useAddTask: (userId: number) => UseFormReturn<AddTaskInputType> = (
  userId,
) => {
  return useForm<AddTaskInputType>({
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
