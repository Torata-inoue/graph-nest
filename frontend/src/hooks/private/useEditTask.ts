import { useForm, UseFormReturn } from "react-hook-form";
import { TaskInputType } from "./useAddTask.ts";
import { Task } from "../../types/task.ts";

export const useEditTask: (task: Task) => UseFormReturn<TaskInputType> = (
  task,
) => {
  return useForm<TaskInputType>({
    defaultValues: {
      name: task.name,
      body: task.body,
      userId: task.userId,
      isTask: task.isTask,
      to: task.to,
      dueTime: task.dueTime,
      isEveryday: task.isEveryday,
      dayOfWeek: task.dayOfWeek,
      date: task.date,
      roomId: task.roomId,
      limitDate: task.limitDate,
      limitHour: task.limitHour,
    },
  });
};
