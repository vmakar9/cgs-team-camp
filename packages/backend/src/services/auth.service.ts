import { IUserCredentials, User } from '../types/user.type';
import PasswordService from '../services/password.service';
import { prisma } from '../prismaclient/prisma.client';
import TokenService from '../services/token.service';
import { ApiError } from '../error/api.error';
import { ITokens } from '../types/token.type';
import { IChangePassword } from '../types/password.type';
import { AcessTokenPayload } from '../types/access-token.type';
import EmailService from '../services/email.service';
import { EActionTokenEnum } from '../enum/action-token.enum';
import { EEmailEnum } from '../enum/email.enum';

export default class AuthService {
	constructor(
		private passwordService: PasswordService,
		private tokenService: TokenService,
		private emailService: EmailService,
	) {}

	async userRegister(body: User): Promise<void> {
		const { password } = body;
		const hashedPassword = await this.passwordService.hash(password);
		const user = await prisma.user.create({
			data: { ...body, password: hashedPassword },
		});

		const actionToken = this.tokenService.generateActionToken(
			{ id: user.id },
			EActionTokenEnum.verifyToken,
		);

		await Promise.all([
			prisma.verifyToken.create({
				data: {
					token: actionToken,
					userId: user.id,
				},
			}),
			this.emailService.sendEmail(body.email, EEmailEnum.WELCOME, {
				actionToken,
			}),
		]);
	}

	async userLogin(
		credentials: IUserCredentials,
		user: User,
	): Promise<ITokens> {
		const isMatched = await this.passwordService.compare(
			credentials.password,
			user.password,
		);
		if (!isMatched) {
			throw new ApiError('Invalid email or password', 409);
		}

		const tokenPair = this.tokenService.generateTokenPair({
			id: user.id,
			isVerified: user.isVerified,
		});

		await prisma.accessToken.create({
			data: {
				token: tokenPair.accessToken,
				userId: user.id,
			},
		});

		await prisma.refreshToken.create({
			data: {
				token: tokenPair.refreshToken,
				userId: user.id,
			},
		});
		return tokenPair;
	}

	async refresh(jwtPayload: AcessTokenPayload): Promise<ITokens> {
		const tokenPair = this.tokenService.generateTokenPair({
			id: jwtPayload.id,
			isVerified: jwtPayload.isVerified,
		});
		await Promise.all([
			prisma.accessToken.create({
				data: { userId: jwtPayload.id, token: tokenPair.accessToken },
			}),
			prisma.refreshToken.create({
				data: { userId: jwtPayload.id, token: tokenPair.accessToken },
			}),
		]);
		return tokenPair;
	}

	async changePassword(
		data: IChangePassword,
		jwtPayload: AcessTokenPayload,
	): Promise<void> {
		const user = await prisma.user.findUnique({
			where: { id: jwtPayload.id },
		});
		if (!user) {
			throw new ApiError('User not found', 404);
		}

		const isMatch = await this.passwordService.compare(
			data.oldPassword,
			user.password,
		);

		if (!isMatch) {
			throw new ApiError('Old password is invalid', 400);
		}

		const hashedUserPassword = await this.passwordService.hash(
			data.newPassword,
		);

		await prisma.user.update({
			where: { id: user.id },
			data: { password: hashedUserPassword },
		});
	}

	async forgotPassword(user: User): Promise<void> {
		const actionToken = this.tokenService.generateActionToken(
			{ id: user.id },
			EActionTokenEnum.forgotToken,
		);
		await prisma.forgotToken.create({
			data: {
				token: actionToken,
				userId: user.id,
			},
		});

		await this.emailService.sendEmail(
			user.email,
			EEmailEnum.FORGOT_PASSWORD,
			{
				token: actionToken,
			},
		);
	}

	async setForgotPassword(
		password: string,
		actionToken: string,
	): Promise<void> {
		const payload = this.tokenService.checkActionTokens(
			actionToken,
			EActionTokenEnum.forgotToken,
		);
		const entity = await prisma.forgotToken.findFirst({
			where: { token: actionToken },
		});
		if (!entity) {
			throw new ApiError('Not valid token', 400);
		}

		const newHashedPassword = await this.passwordService.hash(password);

		await prisma.user.update({
			where: { id: payload.id },
			data: { password: newHashedPassword },
		});
	}

	async vefify(actionToken: string): Promise<void> {
		const payload = this.tokenService.checkActionTokens(
			actionToken,
			EActionTokenEnum.verifyToken,
		);
		const entity = await prisma.verifyToken.findFirst({
			where: { token: actionToken },
		});
		if (!entity) {
			throw new ApiError('Not valid token', 400);
		}
		await prisma.user.update({
			where: { id: payload.id },
			data: { isVerified: true },
		});
	}
}
