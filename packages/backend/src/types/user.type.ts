import { User as PrismaUser } from '@prisma/client';

export type User = PrismaUser;

export interface IUserCredentials {
	email: string;
	password: string;
}
