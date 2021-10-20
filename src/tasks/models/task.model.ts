import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TaskStatusEnum } from '../interfaces/TaskStatusEnum';

@ObjectType({ description: 'task model' })
export class Task {
	@Field(type => ID)
	id: string;

	@Field()
	title: string;

	@Field()
	description: string;

	@Field()
	status: TaskStatusEnum;
}
