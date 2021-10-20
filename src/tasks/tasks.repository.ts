import { Model } from 'mongoose';
import { InternalServerErrorException } from '@nestjs/common';
import { TaskDocument } from './models/task.schema';

export class TasksRepository {
	constructor(private model: Model<TaskDocument>) {
	}

	async create(entity: any): Promise<any> {
		let result;
		try {
			result = await this.model.create(entity);
		} catch (err) {
			throw new InternalServerErrorException(
				`Unable to add a task. err: ${err}`,
			);
		}
		return result;
	}

	async findAll() {
		return await this.model.find().exec();
	}

	async update(id, update) {
		return this.model.findOneAndUpdate({id: id}, update, { returnNewDocument: true });
	}
}
