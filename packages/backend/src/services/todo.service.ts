import { prisma } from '../prismaclient/prisma.client';
import { ApiError } from '../error/api.error';
import { Todo } from '../types/todos.type';

export default class TodoService {
	async findAll(): Promise<Todo[]> {
		try {
			return prisma.todo.findMany();
		} catch (e) {
			throw new ApiError('Todos not found ', 404);
		}
	}

	async createTodo(
		title: string,
		completed: boolean,
		description: string,
	): Promise<Todo> {
		try {
			return prisma.todo.create({
				data: { title, completed, description },
			});
		} catch (e) {
			throw new ApiError('Error create a todo', 422);
		}
	}

	async getTodoById(id: number): Promise<Todo | null> {
		try {
			return prisma.todo.findUnique({
				where: { id: Number(id) },
			});
		} catch (e) {
			throw new ApiError('Error found a todo', 400);
		}
	}

	async updateTodo(id: number, data: Partial<Todo>): Promise<Todo> {
		try {
			return prisma.todo.update({
				where: { id },
				data,
			});
		} catch (e) {
			throw new ApiError('Error to update todo', 400);
		}
	}

	async deleteTodo(id: number): Promise<void> {
		try {
			await prisma.todo.delete({
				where: { id },
			});
		} catch (e) {
			throw new ApiError('Error to delete todo', 400);
		}
	}
}
