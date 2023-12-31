import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/createTask.input';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTaskInput } from './dto/updateTask.input';
import { DeleteTaskInput } from './dto/deleteTask.input';
import { Task } from './models/task.model';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTasks(userId: number): Promise<Task[]> {
    const tasks = await this.prismaService.task.findMany({
      where: { userId },
    });
    return tasks.map((task) => ({ ...task, to: JSON.parse(task.to) }));
  }

  async getSendTasks(
    dueTime: number,
    dayOfWeek: number,
    date: number,
  ): Promise<Task[]> {
    const tasks = await this.prismaService.task.findMany({
      where: {
        AND: [
          {
            OR: [{ isEveryday: true }, { dayOfWeek }, { date }],
          },
          { dueTime },
        ],
      },
    });
    return tasks.map((task) => ({ ...task, to: JSON.parse(task.to) }));
  }

  async createTask(createTaskInput: CreateTaskInput): Promise<Task> {
    const task = await this.prismaService.task.create({
      data: { ...createTaskInput, to: JSON.stringify(createTaskInput.to) },
    });

    return { ...task, to: JSON.parse(task.to) };
  }

  async updateTask(updateTaskInput: UpdateTaskInput): Promise<Task> {
    const task = await this.prismaService.task.update({
      data: { ...updateTaskInput, to: JSON.stringify(updateTaskInput.to) },
      where: { id: updateTaskInput.id },
    });

    return { ...task, to: JSON.parse(task.to) };
  }

  async deleteTask(deleteTaskInput: DeleteTaskInput): Promise<Task> {
    const { id } = deleteTaskInput;
    const task = await this.prismaService.task.delete({
      where: { id },
    });
    return { ...task, to: JSON.parse(task.to) };
  }
}
