import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TaskStatusEnum } from '../interfaces/TaskStatusEnum';

export type TaskDocument = Task & Document;

@Schema({
	toObject: {
		transform: (_doc, ret) => {
			ret.id = ret._id.toHexString();
			delete ret._id;
			delete ret.__v;
			return ret;
		},
	},
	toJSON: {
		transform: (_doc, ret) => {
			ret.id = ret._id.toHexString();
			delete ret._id;
			delete ret.__v;
			return ret;
		},
	},
})
export class Task {
	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	description: string;

	@Prop({ required: true })
	status: TaskStatusEnum;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
