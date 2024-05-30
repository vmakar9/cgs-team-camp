import nodemailer, { SentMessageInfo, Transporter } from 'nodemailer';
import * as path from 'path';
import { configs } from '../configs/configs';
import EmailTemplated from 'email-templates';
import { EEmailEnum } from '../enum/email.enum';
import { allEmailTemplates } from '../constants/email.constants';

export default class EmailService {
	private transporter: Transporter;
	private templateParser;
	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: configs.NO_REPLY_EMAIL,
				pass: configs.NO_REPLY_PASSWORD,
			},
		});
		this.templateParser = new EmailTemplated({
			views: {
				root: path.join(process.cwd(), 'src', 'statics'),
				options: {
					extension: 'hbs',
				},
			},
		});
	}

	public async sendEmail(
		email: string | string[],
		emailAction: EEmailEnum,
		locals: Record<string, string> = {},
	): Promise<SentMessageInfo> {
		const templateInfo = allEmailTemplates[emailAction];
		locals.frontURL = configs.FRONT_URL;
		const html = await this.templateParser.render(
			templateInfo.templateName,
			locals,
		);
		return this.transporter.sendMail({
			from: 'No reply',
			to: email,
			subject: templateInfo.subject,
			html,
		});
	}
}
