export type Task = {
  id: number;
  name: string;
  body: string;
  userId: number;
  isTask: boolean;
  to: string;
  dueTime: number;
  isEveryday: boolean;
  dayOfWeek: number;
  date: number;
  createdAt: Date;
  updatedAt: Date;
};
