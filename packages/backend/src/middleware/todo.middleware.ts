import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../error/api.error';
import { TodoValidate } from '../validate/todo.validate';

class TodoMiddleware {
	public async isValidCreate(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { error, value } = TodoValidate.createTodo.validate(req.body);
			if (error) {
				throw new ApiError(error.message, 400);
			}
			req.body = value;
			next();
		} catch (e) {
			next(e);
		}
	}
	public async isValidUpdate(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { error, value } = TodoValidate.updateTodo.validate(req.body);
			if (error) {
				throw new ApiError(error.message, 400);
			}
			req.body = value;
			next();
		} catch (e) {
			next(e);
		}
	}
}

export const todoMiddleware = new TodoMiddleware();
