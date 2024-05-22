import { Response, Request } from 'express';
import TodoService from '../services/todo.service';
import { Todo } from '@/types/todos.type';
import { ApiError } from '@/error/api.error';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async getAllTodo(_: Request, res: Response): Promise<void> {
		try {
			const todos = await this.todoService.findAll();
			res.send(todos);
		} catch (e) {
			throw new ApiError('Something went wrong', 500);
		}
	}

	async createTodo(req: Request, res: Response): Promise<void> {
		try {
			const { title, completed, description } = req.body;
			const todo = await this.todoService.createTodo(
				title,
				completed,
				description,
			);
			res.json(todo);
		} catch (e) {
			throw new ApiError('Something went wrong', 500);
		}
	}

	async getById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const todo = await this.todoService.getTodoById(Number(id));
			res.json(todo);
		} catch (e) {
			throw new ApiError('Something went wrong', 500);
		}
	}

	async updateTodo(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const data: Partial<Todo> = req.body;
			const todo = await this.todoService.updateTodo(Number(id), data);
			res.json(todo);
		} catch (e) {
			throw new ApiError('Something went wrong', 500);
		}
	}

	async deleteTodo(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			await this.todoService.deleteTodo(Number(id));
			res.json('Todo is deleted');
		} catch (e) {
			throw new ApiError('Something went wrong', 500);
		}
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
