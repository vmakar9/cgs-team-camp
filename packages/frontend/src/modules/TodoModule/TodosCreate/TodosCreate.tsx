import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ITodo } from '~typings/todo.type';
import { todoService } from '~services/todo.service';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import { todoValidation } from '../../../validations/todo.validation';
import { button, error, form, input } from '~shared/styles/todo-form.style';

export const TodosCreate = (): React.JSX.Element => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<ITodo>({
		resolver: joiResolver(todoValidation),
	});
	const navigate = useNavigate();

	const createTodo: SubmitHandler<ITodo> = async (todo) => {
		await todoService.create(todo);
		navigate('/todos');
	};

	return (
		<div>
			<form onSubmit={handleSubmit(createTodo)} className={form}>
				<input
					type="text"
					placeholder="title"
					{...register('title')}
					className={input}
				/>
				{errors.title && (
					<div className={error}>title {errors.title.message}</div>
				)}
				<input
					type="text"
					placeholder="description"
					{...register('description')}
					className={input}
				/>
				{errors.description && (
					<div className={error}>
						description {errors.description.message}
					</div>
				)}
				<label htmlFor="completed">Completed</label>
				<input
					type="checkbox"
					placeholder="completed"
					{...register('completed')}
					className={input}
				/>
				{errors.completed && (
					<div className={error}>
						completed {errors.completed.message}
					</div>
				)}

				<button className={button}>Create</button>
			</form>
		</div>
	);
};
