import { NextFunction, Request, Response } from 'express';
import TokenService from '../services/token.service';
import { ApiError } from '../error/api.error';
import { ETokenAccess } from '../enum/token-access.enum';

class AuthMiddleware {
	constructor(private tokenService: TokenService) {}

	public async checkAccessToken(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const tokenString = req.get('Authorization');
			if (!tokenString) {
				throw new ApiError('No token', 401);
			}
			const accessToken = tokenString.split('Bearer ')[1];

			res.locals.jwtPayload = this.tokenService.checkTokens(
				accessToken,
				ETokenAccess.accessToken,
			);
			next();
		} catch (e) {
			next(e);
		}
	}

	public async checkRefrehToken(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const tokenString = req.get('Authorization');
			if (!tokenString) {
				throw new ApiError('No token', 401);
			}
			const refreshToken = tokenString.split('Bearer ')[1];

			res.locals.jwtPayload = this.tokenService.checkTokens(
				refreshToken,
				ETokenAccess.refreshToken,
			);
			next();
		} catch (e) {
			next(e);
		}
	}
}

export const authMiddleware = new AuthMiddleware(new TokenService());
