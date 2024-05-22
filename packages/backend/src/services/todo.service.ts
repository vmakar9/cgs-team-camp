import { prisma } from '../prismaclient/prisma.client';

import { Todo } from '../types/todos.type';

export default class TodoService {
	async findAll(): Promise<Todo[]> {
		return prisma.todo.findMany();
	}

	async createTodo(
		title: string,
		completed: boolean,
		description: string,
	): Promise<Todo> {
		return prisma.todo.create({
			data: { title, completed, description },
		});
	}

	async getTodoById(id: number): Promise<Todo | null> {
		return prisma.todo.findUnique({
			where: { id: Number(id) },
		});
	}

	async updateTodo(id: number, data: Partial<Todo>): Promise<Todo> {
		return prisma.todo.update({
			where: { id },
			data,
		});
	}

	async deleteTodo(id: number): Promise<void> {
		await prisma.todo.delete({
			where: { id },
		});
	}
}
