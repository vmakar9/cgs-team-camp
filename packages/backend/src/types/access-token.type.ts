import { AccessToken as PrismaAccessToken } from '@prisma/client';
import { User } from '@/types/user.type';

export type AccessTokenType = PrismaAccessToken;

export type AcessTokenPayload = Pick<User, 'id' | 'isVerified'>;
