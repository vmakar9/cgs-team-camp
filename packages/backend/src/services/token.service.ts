import * as jwt from 'jsonwebtoken';
import { AcessTokenPayload } from '../types/access-token.type';
import { ActionTokenPayload, ITokens } from '../types/token.type';
import { configs } from '../configs/configs';
import { ETokenAccess } from '../enum/token-access.enum';
import { EActionTokenEnum } from '../enum/action-token.enum';

export default class TokenService {
	generateTokenPair(payload: AcessTokenPayload): ITokens {
		const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
			expiresIn: '20m',
		});
		const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
			expiresIn: '30m',
		});
		return {
			accessToken,
			refreshToken,
		};
	}

	checkTokens(token: string, tokenType: ETokenAccess): AcessTokenPayload {
		let secret = '';
		switch (tokenType) {
			case ETokenAccess.accessToken:
				secret = configs.JWT_ACCESS_SECRET;
				break;
			case ETokenAccess.refreshToken:
				secret = configs.JWT_REFRESH_SECRET;
				break;
		}
		return jwt.verify(token, secret) as AcessTokenPayload;
	}

	generateActionToken(
		payload: ActionTokenPayload,
		type: EActionTokenEnum,
	): string {
		let secret = '';
		switch (type) {
			case EActionTokenEnum.verifyToken:
				secret = configs.JWT_VERIFY_SECRET;
				break;
			case EActionTokenEnum.forgotToken:
				secret = configs.JWT_FORGOT_SECRET;
				break;
		}
		return jwt.sign(payload, secret, {
			expiresIn: '3d',
		});
	}

	checkActionTokens(
		token: string,
		tokenType: EActionTokenEnum,
	): ActionTokenPayload {
		let secret = '';
		switch (tokenType) {
			case EActionTokenEnum.verifyToken:
				secret = configs.JWT_VERIFY_SECRET;
				break;
			case EActionTokenEnum.forgotToken:
				secret = configs.JWT_FORGOT_SECRET;
				break;
		}
		return jwt.verify(token, secret) as ActionTokenPayload;
	}
}
