import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository) private tasksRepository: TasksRepository,
  ) {}
  // private tasks: ITask[] = [];
  // getAllTasks(): ITask[] {
  //   return this.tasks;
  // }
  // getTasksByFilter(filterDto: GetTasksFilterDto): ITask[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.description.includes(search) || task.title.includes(search),
  //     );
  //   }
  //   return tasks;
  // }

  async getTaskById(taskId: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ${taskId} not found.`);
    }

    return task;
  }

  // createTask(createTaskDto: CreateTaskDto): ITask {
  //   const { title, description } = createTaskDto;
  //   const newTask: ITask = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(newTask);
  //   return newTask;
  // }
  // deleteTaskById(id: string): void {
  //   const taskToDelete = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== taskToDelete.id);
  // }
  // updateTaskById(taskId: string, updateTaskDto: UpdateTaskStatusDto): ITask {
  //   let updatedTask;
  //   this.tasks = this.tasks.map((task) => {
  //     if (task.id === taskId) {
  //       task.status = updateTaskDto.status;
  //     }
  //     updatedTask = task;
  //     return task;
  //   });
  //   return updatedTask;
  // }
}
