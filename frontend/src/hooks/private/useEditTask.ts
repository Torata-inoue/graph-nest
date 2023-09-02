import {useForm, UseFormReturn} from "react-hook-form";
import {TaskStatus} from "../../types/taskStatus.ts";
import {Task} from "../../types/task.ts";

type UpdateTaskInput = {
  id: number;
  name: string;
  dueDate: string;
  status: TaskStatus;
  description: string;
};
export const useEditTask: (task: Task) => UseFormReturn<UpdateTaskInput> = (task) => {
  return useForm<UpdateTaskInput>({
    defaultValues: {
      id: task.id,
      name: task.name,
      dueDate: task.dueDate,
      status: task.status,
      description: task.description,
    }
  })
}
