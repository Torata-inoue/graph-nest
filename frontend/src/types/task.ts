import {TaskStatus} from "./taskStatus.ts";

export type Task = {
  id: number;
  name: string;
  dueDate: string;
  status: TaskStatus;
  description: string;
};
