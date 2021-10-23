import { Model} from 'mongoose';
import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { TaskDocument } from '../models/task.schema';
import { NewTaskInput } from '../models/dto/new-task-input';
import { ObjectId } from 'mongodb';
import { ITask } from '../interfaces/Task.interface';

export class TasksRepository {
	private readonly logger = new Logger(TasksRepository.name);
	constructor(private model: Model<TaskDocument>) {
	}

	async create(entity: NewTaskInput): Promise<ITask> {
		let result: TaskDocument;
		try {
			result = await this.model.create(entity);
		} catch (err) {
			this.logger.error(`Failed to add a task. Error: ${err}`);
			throw new InternalServerErrorException(
				`Failed to add a task with body: ${entity}`,
			);
		}
		return result;
	}

	async findAll(): Promise<ITask[]> {
		try {
			return await this.model.find().exec();
		} catch (err) {
			this.logger.error(`Failed to get all tasks. Error: ${err}`);
			throw new InternalServerErrorException(
				`Failed to get all tasks`,
			);
		}
	}

	async update(id, update): Promise<ITask> {
		try {
			const updated =  await this.model.findOneAndUpdate({ _id: new ObjectId(id) }, update, { new: true });
			if (!updated)  {
				throw new NotFoundException(`Task not found by given id`)
			}
			return updated;
		} catch (err) {
			this.logger.error(`Failed to update task. Error: ${err}`);
			throw new InternalServerErrorException(
				`Failed to update task with id: ${id}}`,
			);
		}
	}
}
