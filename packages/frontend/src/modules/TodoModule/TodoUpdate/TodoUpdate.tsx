import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ITodo } from '~typings/todo.type';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { todoService } from '~services/todo.service';
import { joiResolver } from '@hookform/resolvers/joi';
import { todoValidation } from '../../../validations/todo.validation';
import { button, error, form, input } from '~shared/styles/todo-form.style';

export const TodoUpdate = (): React.JSX.Element => {
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = useForm<ITodo>({
		resolver: joiResolver(todoValidation),
	});
	const navigate = useNavigate();
	const { id } = useParams();
	const location = useLocation();
	const todoDetails = location.state as ITodo;

	useEffect(() => {
		if (todoDetails) {
			setValue('title', todoDetails.title);
			setValue('completed', todoDetails.completed);
		}
	}, [todoDetails, setValue]);

	const updateTodo: SubmitHandler<ITodo> = async (todo) => {
		await todoService.updateTodo(id, todo);
		navigate('/todos');
	};

	return (
		<div>
			<form onSubmit={handleSubmit(updateTodo)} className={form}>
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

				<button className={button}>Create</button>
			</form>
		</div>
	);
};
