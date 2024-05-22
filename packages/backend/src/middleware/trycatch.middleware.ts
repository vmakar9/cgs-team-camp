import { Request, Response, NextFunction } from 'express';

export const tryCatch = (
	fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) => {
	return (req: Request, res: Response, next: NextFunction): void => {
		fn(req, res, next).catch(next);
	};
};
