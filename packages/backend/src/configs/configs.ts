import { config } from 'dotenv';
import * as process from 'node:process';
config();

export const configs = {
	JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'access',
	JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'refresh',
	JWT_FORGOT_SECRET: process.env.JWT_FORGOT_SECRET || 'forgot',
	JWT_VERIFY_SECRET: process.env.JWT_VERIFY_SECRET || 'verify',
	FRONT_URL: process.env.FRONT_URL || 'http://localhost:5173',
	NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
	NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD,
};
