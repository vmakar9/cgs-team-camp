import Joi from 'joi';

export const todoSchema = Joi.object({
	title: Joi.string().min(5).trim(),
	completed: Joi.boolean(),
	description: Joi.string().allow(null, '').optional().trim(),
});
