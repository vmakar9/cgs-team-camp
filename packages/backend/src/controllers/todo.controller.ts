import { Response, Request, NextFunction } from 'express';
import TodoService from '../services/todo.service';
import { Todo } from '@/types/todos.type';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async getAllTodo(
		_: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const todos = await this.todoService.findAll();
			res.send(todos);
		} catch (e) {
			next(e);
		}
	}

	async createTodo(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { title, completed, description } = req.body;
			const todo = await this.todoService.createTodo(
				title,
				completed,
				description,
			);
			res.json(todo);
		} catch (e) {
			next(e);
		}
	}

	async getById(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { id } = req.params;
			const todo = await this.todoService.getTodoById(Number(id));
			res.json(todo);
		} catch (e) {
			next(e);
		}
	}

	async updateTodo(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { id } = req.params;
			const data: Partial<Todo> = req.body;
			const todo = await this.todoService.updateTodo(Number(id), data);
			res.json(todo);
		} catch (e) {
			next(e);
		}
	}

	async deleteTodo(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { id } = req.params;
			await this.todoService.deleteTodo(Number(id));
			res.json('Todo is deleted');
		} catch (e) {
			next(e);
		}
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
