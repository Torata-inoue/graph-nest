import { useForm, UseFormReturn } from "react-hook-form";

export type TaskInputType = {
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
export const useAddTask: (userId: number) => UseFormReturn<TaskInputType> = (
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
