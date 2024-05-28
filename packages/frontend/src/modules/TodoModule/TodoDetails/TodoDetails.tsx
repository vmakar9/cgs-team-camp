import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ITodo } from '~typings/todo.type';
import { todoService } from '~services/todo.service';
import React from 'react';
import { TodoDetail } from '~modules/TodoModule/TodoDetail/TodoDetail';

export const TodoDetails = (): React.JSX.Element => {
	const { id } = useParams();
	const [todoDetails, setTodoDetails] = useState<ITodo>(null);
	const getTodoDetails = (): Promise<void> => {
		return todoService.getTodoById(id).then((data) => setTodoDetails(data));
	};

	useEffect(() => {
		getTodoDetails();
	}, []);

	return <div>{todoDetails && <TodoDetail todoDetails={todoDetails} />}</div>;
};
