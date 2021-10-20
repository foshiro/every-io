import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { TaskStatusEnum } from '../../interfaces/TaskStatusEnum';

@InputType()
export class NewTaskInput {
	@Field()
	@MaxLength(30)
	title: string;

	@Field()
	@MaxLength(255)
	description: string;

	@Field()
	status: TaskStatusEnum;
}
