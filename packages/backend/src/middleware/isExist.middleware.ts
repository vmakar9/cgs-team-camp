import { Request, Response, NextFunction } from 'express';
import { prisma } from '../prismaclient/prisma.client';
import { EModels } from '../enum/models.enum';
import { ApiError } from '../error/api.error';

export const isExist = (model: EModels) => {
	return async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;

			const record = await prisma[model].findUnique({
				where: { id: Number(id) },
			});

			if (!record) {
				throw new ApiError(`Record with id:${id} not found`, 404);
			}

			next();
		} catch (error) {
			next(error);
		}
	};
};
