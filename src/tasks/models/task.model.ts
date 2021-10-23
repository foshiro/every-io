import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TaskStatusEnum } from '../interfaces/TaskStatusEnum';
import { ITask } from '../interfaces/Task.interface';

@ObjectType({ description: 'task model' })
export class Task implements ITask {
	@Field(type => ID)
	id: string;

	@Field()
	title: string;

	@Field()
	description: string;

	@Field()
	status: TaskStatusEnum;
}
