import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task as TaskModel } from './models/task.model';
import { CreateTaskInput } from './dto/createTask.input';
import { DeleteTaskInput } from './dto/deleteTask.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UpdateTaskInput } from './dto/updateTask.input';

@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [TaskModel], { nullable: 'items' })
  @UseGuards(JwtAuthGuard)
  async getTasks(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<TaskModel[]> {
    return await this.taskService.getTasks(userId);
  }

  @Mutation(() => TaskModel)
  @UseGuards(JwtAuthGuard)
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): Promise<TaskModel> {
    return await this.taskService.createTask(createTaskInput);
  }

  @Mutation(() => TaskModel)
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ): Promise<TaskModel> {
    return await this.taskService.updateTask(updateTaskInput);
  }

  @Mutation(() => TaskModel)
  @UseGuards(JwtAuthGuard)
  async deleteTask(
    @Args('deleteTaskInput') deleteTaskInput: DeleteTaskInput,
  ): Promise<TaskModel> {
    return await this.taskService.deleteTask(deleteTaskInput);
  }
}
