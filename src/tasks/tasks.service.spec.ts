import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  delete: jest.fn(),
});

const mockUser = {
  username: 'Test User',
  id: 1,
  password: 'testPassword',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    tasksRepository = module.get<TasksRepository>(TasksRepository);
  });

  describe('getTasks', () => {
    it('gets all tasks from the repository', async () => {
      tasksRepository.getTasks.mockResolvedValue('someValue');

      const result = await tasksService.getTasks(null, mockUser);

      expect(result).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    it('calls tasksRepository.findOne() and successfully retrieve and return the task', async () => {
      const mockTask = {
        title: 'Test task',
        description: 'Test desc',
        id: 1,
        status: TaskStatus.OPEN,
      };

      tasksRepository.findOne.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById('1', mockUser);

      expect(result).toEqual(mockTask);

      expect(tasksRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1', user: mockUser },
      });
    });

    it('throws an error as task is not found', async () => {
      tasksRepository.findOne.mockResolvedValue(null);

      expect(tasksService.getTaskById('1', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
