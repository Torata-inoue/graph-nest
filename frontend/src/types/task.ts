export type Task = {
  id: number;
  name: string;
  body: string;
  userId: number;
  isTask: boolean;
  to: number[];
  dueTime: number;
  isEveryday: boolean;
  dayOfWeek?: number;
  date?: number;
  roomId: number;
  limitDate?: number;
  limitHour?: number;
  createdAt: Date;
  updatedAt: Date;
};
