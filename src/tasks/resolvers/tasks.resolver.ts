import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task.model';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewTaskInput } from '../models/dto/new-task-input';
import { TaskStatusEnum } from '../interfaces/TaskStatusEnum';

@Resolver(() => Task)
export class TasksResolver {
	constructor(private readonly tasksService: TasksService) {
	}

	@Mutation(() => Task, {
		description: 'Create a new task',
	})
	async createTask(
		@Args('task') task: NewTaskInput,
	) {
		return await this.tasksService.create(task);
	}

	@Query(() => [Task], {
		description: 'Gets a list of Tasks',
	})
	async getTasks() {
		return await this.tasksService.findAll();
	}

	@Mutation(() => Task, {
		description: 'Update task status',
	})
	async updateTaskStatus(
		@Args('taskId') taskId: string,
		@Args('status') status: TaskStatusEnum,
	) {
		return await this.tasksService.updateStatus(taskId, status);
	}
}
