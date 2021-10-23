import { Injectable } from '@nestjs/common';
import { NewTaskInput } from '../models/dto/new-task-input';
import { Task, TaskDocument } from '../models/task.schema';
import { TasksRepository } from '../repositories/tasks.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITask } from '../interfaces/Task.interface';

@Injectable()
export class TasksService {
	public readonly tasksRepository: TasksRepository;

	constructor(@InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,) {
		this.tasksRepository = new TasksRepository(taskModel);
	}

	async create(data: NewTaskInput): Promise<ITask> {
		return this.tasksRepository.create(data);
	}

	async findAll(): Promise<ITask[]> {
		return this.tasksRepository.findAll();
	}

	async updateStatus(id: string, status: string): Promise<ITask> {
		return this.tasksRepository.update(id, { status: status });
	}
}
