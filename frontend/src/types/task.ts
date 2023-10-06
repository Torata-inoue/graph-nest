export type Task = {
  id: number;
  name: string;
  body: string;
  userId: number;
  isTask: boolean;
  to: number[];
  dueTime: number;
  isEveryday: boolean;
  dayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  date?: number;
  roomId: number;
  limitDate?: number;
  limitHour?: number;
  createdAt: Date;
  updatedAt: Date;
};
