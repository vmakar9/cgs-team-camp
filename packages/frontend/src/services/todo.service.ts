import HttpService from '~services/http.service';
import { ITodo } from '~typings/todo.type';

class TodoService extends HttpService {
	constructor() {
		super();
	}

	async getAllTodos(): Promise<ITodo[]> {
		const { data } = await this.get({ url: 'todos/all' });
		return data;
	}

	async getTodoById(id: string): Promise<ITodo> {
		const { data } = await this.get({ url: `todos/todo/${id}` });
		return data;
	}

	async create(body: Partial<ITodo>): Promise<ITodo> {
		const { data } = await this.post({
			url: 'todos/create',
			data: body,
		});
		return data;
	}

	async updateTodo(id: string, body: Partial<ITodo>): Promise<ITodo> {
		const { data } = await this.put({
			url: `todos/update/${id}`,
			data: body,
		});
		return data;
	}

	async deleteTodo(id: number): Promise<ITodo> {
		const { data } = await this.delete({ url: `todos/delete/${id}` });
		return data;
	}
}

export const todoService = new TodoService();
