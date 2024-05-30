import AuthService from '../services/auth.service';
import { Request, Response } from 'express';
import { ApiError } from '../error/api.error';
import PasswordService from '../services/password.service';
import TokenService from '../services/token.service';
import { IChangePassword } from '../types/password.type';
import { AcessTokenPayload } from '../types/access-token.type';
import EmailService from '../services/email.service';

export class AuthController {
	constructor(private authService: AuthService) {}
	async userRegister(req: Request, res: Response): Promise<void> {
		try {
			await this.authService.userRegister(req.body);
			res.sendStatus(200);
		} catch (e) {
			throw new ApiError('Something went wrong', 500);
		}
	}

	async userLogin(req: Request, res: Response): Promise<void> {
		try {
			const { email, password } = req.body;
			const user = res.locals.user;
			const tokenPair = await this.authService.userLogin(
				{ email, password },
				user,
			);
			res.json(tokenPair);
		} catch (e) {
			throw new ApiError('Something went wrong', 500);
		}
	}

	async userRefresh(req: Request, res: Response): Promise<void> {
		try {
			const jwtPayload = res.locals.jwtPayload;
			const tokenPair = await this.authService.refresh(jwtPayload);
			res.json(tokenPair);
		} catch (e) {
			throw new ApiError('Something went wrong', 500);
		}
	}

	async userChangePassword(req: Request, res: Response): Promise<void> {
		try {
			const jwtPayload = res.locals.jwtPayload as AcessTokenPayload;
			const body = req.body as IChangePassword;
			await this.authService.changePassword(body, jwtPayload);
			res.sendStatus(204);
		} catch (e) {
			throw new ApiError('Something went wrong', 500);
		}
	}

	async forgotPassword(req: Request, res: Response): Promise<void> {
		try {
			const user = res.locals.user;
			await this.authService.forgotPassword(user);
			res.json('OK');
		} catch (e) {
			throw new ApiError('Something went wrong', 500);
		}
	}

	async setForgotPassword(req: Request, res: Response): Promise<void> {
		try {
			const token = req.params.token;
			const newPassword = req.body.newPassword;

			await this.authService.setForgotPassword(newPassword, token);

			res.sendStatus(200);
		} catch (e) {
			throw new ApiError('Something went wrong', 500);
		}
	}

	async verifyUser(req: Request, res: Response): Promise<void> {
		try {
			const token = req.params.token;
			await this.authService.vefify(token);

			res.sendStatus(200);
		} catch (e) {
			throw new ApiError('Something went wrong', 500);
		}
	}
}

const authController = new AuthController(
	new AuthService(
		new PasswordService(),
		new TokenService(),
		new EmailService(),
	),
);
export default authController;
