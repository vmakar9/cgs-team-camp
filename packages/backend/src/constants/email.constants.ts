import { EEmailEnum } from '../enum/email.enum';

export const allEmailTemplates: {
	[key: string]: { subject: string; templateName: string };
} = {
	[EEmailEnum.WELCOME]: {
		subject: 'Welcome',
		templateName: 'welcome_user',
	},
	[EEmailEnum.FORGOT_PASSWORD]: {
		subject: 'Forgot your password',
		templateName: 'forgot_password',
	},
};
