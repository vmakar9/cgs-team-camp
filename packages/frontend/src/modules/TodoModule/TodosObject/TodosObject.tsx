import React, { FC, useState } from 'react';
import { ITodo } from '~typings/todo.type';
import { useNavigate } from 'react-router-dom';
import { todoService } from '~services/todo.service';
import { tableColumnStyle } from '~modules/TodoModule/TodoList/desktopview/todo-list.style';
import classNames from 'classnames';
import {
	tableActionsColumnStyle,
	tableDescriptionStyle,
	tableTitleColumnStyle,
} from '~modules/TodoModule/TodosObject/todo-object-style/todo-object.style';
import {
	actionsButoonStyle,
	ButtonStyle,
} from '~modules/TodoModule/TodosObject/todo-button-style/todo-button.style';
import Button from '~shared/components/button/button.component';
import Switch from '~shared/components/switch/switch.component';
interface IProps {
	todo: ITodo;
	trigger: () => void;
}

export const TodosObject: FC<IProps> = ({ todo, trigger }) => {
	const { id, title, description, completed: initialCompleted } = todo;
	const navigate = useNavigate();
	const [completed, setCompleted] = useState<boolean>(initialCompleted);

	const handleCompletedSwitch = async (
		newCompleted: boolean,
	): Promise<void> => {
		const updatedTodo = await todoService.updateTodo(id.toString(), {
			completed: newCompleted,
		});
		setCompleted(updatedTodo.completed);
	};

	const deleteById = async (): Promise<void> => {
		await todoService.deleteTodo(id);
		trigger();
	};

	return (
		<>
			<div
				className={classNames(tableColumnStyle, tableTitleColumnStyle)}
				data-label="Title"
			>
				{title}
			</div>
			<div
				className={classNames(tableColumnStyle, tableDescriptionStyle)}
				data-label="Description"
			>
				{description}
			</div>
			<div
				className={classNames(
					tableColumnStyle,
					tableActionsColumnStyle,
				)}
				data-label="Actions"
			>
				<div className={actionsButoonStyle}>
					<Button onClick={deleteById} className={ButtonStyle}>
						Delete
					</Button>
					<Button
						className={ButtonStyle}
						onClick={() => navigate(`${id}`)}
					>
						View
					</Button>
				</div>
			</div>
			<Switch
				checked={completed}
				onChange={handleCompletedSwitch}
				label="Completed"
			/>
		</>
	);
};
