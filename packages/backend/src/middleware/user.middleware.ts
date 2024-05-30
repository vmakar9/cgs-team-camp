import { Request, Response, NextFunction } from 'express';
import { prisma } from '../prismaclient/prisma.client';
import { ApiError } from '../error/api.error';

const findUserByEmail = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { email } = req.body;
		if (!email) {
			throw new ApiError('Email is required', 404);
		}

		const user = await prisma.user.findUnique({ where: { email: email } });

		if (!user) {
			throw new ApiError('Email or password is incorrect', 401);
		}

		res.locals.user = user;
		next();
	} catch (e) {
		next(e);
	}
};

export default findUserByEmail;
