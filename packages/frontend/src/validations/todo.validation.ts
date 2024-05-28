import Joi from 'joi';

export const todoValidation = Joi.object({
	title: Joi.string().min(5).trim().messages({
		'string.pattern.base': 'Only letters min 5',
	}),
	completed: Joi.boolean(),
	description: Joi.string().allow(null, '').optional().trim(),
});
