import { Module} from '@nestjs/common';
import { TasksResolver } from './resolvers/tasks.resolver';
import { TasksService } from './services/tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './models/task.schema';

@Module({
	imports: [
		MongooseModule.forFeature(
			[
				{
					name: Task.name,
					schema: TaskSchema,
				},
			],
		),
	],
	providers: [TasksService, TasksResolver],
	exports: [TasksService],
})
export class TasksModule {}
