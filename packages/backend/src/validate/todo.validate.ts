import Joi from 'joi';

export class TodoValidate {
	private static title = Joi.string().min(5).trim();
	private static completed = Joi.boolean();
	private static description = Joi.string().min(5).trim();

	static createTodo = Joi.object({
		title: this.title.required(),
		completed: this.completed.required(),
		description: this.description,
	});
	static updateTodo = Joi.object({
		title: this.title.required(),
		completed: this.completed.required(),
		description: this.description,
	});
}
