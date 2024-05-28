import * as React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '~modules/MainLayout/MainLayout';
import { TodosList } from '~modules/TodoModule/TodoList/TodosList';
import { TodoDetails } from '~modules/TodoModule/TodoDetails/TodoDetails';
import { TodosCreate } from '~modules/TodoModule/TodosCreate/TodosCreate';
import { TodoUpdate } from '~modules/TodoModule/TodoUpdate/TodoUpdate';

const Router = createBrowserRouter([
	{
		path: '',
		element: <MainLayout />,
		children: [
			{ index: true, element: <Navigate to={'todos'} /> },
			{ path: 'todos', element: <TodosList /> },
			{ path: 'todos/:id', element: <TodoDetails /> },
			{ path: 'create', element: <TodosCreate /> },
			{ path: 'update/:id', element: <TodoUpdate /> },
		],
	},
]);

export default Router;
