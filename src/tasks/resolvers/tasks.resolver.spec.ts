import { TasksResolver } from './tasks.resolver';
import { TasksService } from '../services/tasks.service';
import { TaskStatusEnum } from '../interfaces/TaskStatusEnum';
import { ITask } from '../interfaces/Task.interface';

describe('Tasks Resolver', () => {
	let tasksResolver: TasksResolver;
	let tasksService: TasksService;

	const tasks: ITask[] = [{
		id: '1',
		status: TaskStatusEnum.TO_DO,
		description: 'Task 1 description',
		title: 'Task 1 title'
	}, {
		id: '2',
		status: TaskStatusEnum.DONE,
		description: 'Task 2 description',
		title: 'Task 2 title'
	}];


	beforeEach(() => {
		tasksService = new TasksService(null);
		tasksResolver = new TasksResolver(tasksService);
	});

	describe('Get Tasks', () => {
		it('should return a list tasks', async () => {
			jest
				.spyOn(tasksService, 'findAll')
				.mockImplementation(async () => tasks);

			expect(await tasksResolver.getTasks()).toBe(tasks);
		});
	});

	describe('Create Task', () => {
		it('should create task successfully', async () => {
			jest
				.spyOn(tasksService, 'create')
				.mockImplementation(async () => tasks[0]);

			expect(await tasksResolver.createTask(tasks[0])).toBe(tasks[0]);
		});
	});

	describe('Update Task Status', () => {
		it('should update task status successfully', async () => {
			jest
				.spyOn(tasksService, 'updateStatus')
				.mockImplementation(async () => tasks[0]);

			expect(await tasksResolver.updateTaskStatus('1', TaskStatusEnum.DONE)).toBe(tasks[0]);
		});
	});
});
