import { Injectable } from '@nestjs/common';
import { NewTaskInput } from './models/dto/new-task-input';
import { Task, TaskDocument } from './models/task.schema';
import { TasksRepository } from './tasks.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
	public readonly tasksRepository: TasksRepository;
	constructor(@InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,) {
		this.tasksRepository = new TasksRepository(taskModel);
	}
	async create(data: NewTaskInput) {
		return this.tasksRepository.create(data);
	}

	async findAll() {
		return this.tasksRepository.findAll();
	}

	async updateStatus(id: string, status: string) {
		return this.tasksRepository.update(id, { status: status });
	}
}
