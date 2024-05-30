import { User } from '@/types/user.type';

export interface ITokens {
	accessToken: string;
	refreshToken: string;
}

export type ActionTokenPayload = Pick<User, 'id'>;
