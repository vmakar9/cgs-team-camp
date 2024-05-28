import React, { useState } from 'react';
import { FC } from 'react';
import { ITodo } from '~typings/todo.type';
import { useNavigate } from 'react-router-dom';
import Button from '~shared/components/button/button.component';
import { ButtonStyle } from '~modules/TodoModule/TodosObject/todo-button-style/todo-button.style';
import classNames from 'classnames';
import { containerStyle } from '~modules/TodoModule/TodoList/desktopview/todo-list.style';
import { detailsContainerStyle } from '~modules/TodoModule/TodoDetail/todo-detail-style/todo-detail.style';
import Switch from '~shared/components/switch/switch.component';
import { todoService } from '~services/todo.service';
interface IProps {
	todoDetails: ITodo;
}

export const TodoDetail: FC<IProps> = ({ todoDetails }) => {
	const { id, title, description, completed: initialCompleted } = todoDetails;
	const [completed, setCompleted] = useState<boolean>(initialCompleted);

	const handleCompletedSwitch = async (
		newCompleted: boolean,
	): Promise<void> => {
		const updatedTodo = await todoService.updateTodo(id.toString(), {
			completed: newCompleted,
		});
		setCompleted(updatedTodo.completed);
	};

	const navigate = useNavigate();

	return (
		<div>
			<div className={classNames(containerStyle, detailsContainerStyle)}>
				<div className={containerStyle}>
					<h1>{id}</h1>
					<h2>{title}</h2>
					<h4>Description: {description}</h4>
				</div>
				<Switch
					checked={completed}
					onChange={handleCompletedSwitch}
					label="Completed"
				/>
				<Button
					className={ButtonStyle}
					onClick={() =>
						navigate(`/update/${id}`, { state: todoDetails })
					}
				>
					Update
				</Button>
			</div>
			<div>
				<Button
					onClick={() => {
						navigate(-1);
					}}
					className={ButtonStyle}
				>
					Back
				</Button>
			</div>
		</div>
	);
};
