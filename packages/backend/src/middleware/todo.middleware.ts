import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../error/api.error';
import { Schema } from 'joi';

const validate = (schema: Schema) => {
	return (req: Request, res: Response, next: NextFunction): void => {
		const { error } = schema.validate(req.body);
		if (error) {
			throw new ApiError(error.message, 400);
		}
		next();
	};
};

export { validate };
