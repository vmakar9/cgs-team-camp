import bcrypt from 'bcrypt';

export default class PasswordService {
	async hash(password: string): Promise<string> {
		return bcrypt.hash(password, 10);
	}
	async compare(password: string, hashedPassword: string): Promise<boolean> {
		return bcrypt.compare(password, hashedPassword);
	}
}
