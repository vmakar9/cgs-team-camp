import React, { ReactElement, useEffect, useState } from 'react';
import { ITodo } from '~typings/todo.type';

import { todoService } from '~/services/todo.service';
import { TodosObject } from '~modules/TodoModule/TodosObject/TodosObject';
import { useNavigate } from 'react-router-dom';
import {
	containerStyle,
	tableColumnStyle,
	tableHeaderActionsColumnStyle,
	tableHeaderDescriptionStyle,
	tableHeaderStyle,
	tableHeaderTitleColumnStyle,
	tableRowStyle,
	tableStyle,
} from '~modules/TodoModule/TodoList/desktopview/todo-list.style';
import { ButtonStyle } from '~modules/TodoModule/TodosObject/todo-button-style/todo-button.style';
import Button from '~shared/components/button/button.component';
import { theme } from '~shared/styles/theme';
import { Carousel } from 'react-responsive-carousel';
import { cx } from '@emotion/css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export const TodosList = (): React.JSX.Element => {
	const [todosList, setTodosList] = useState<ITodo[]>([]);
	const [flag, setFlag] = useState<boolean>(null);
	const [isMobile, setIsMobile] = useState(
		window.innerWidth <= theme.media.mobile,
	);
	const [isTablet, setIsTablet] = useState(
		window.innerWidth >= theme.media.tablet &&
			window.innerWidth < theme.media.desktop,
	);
	const navigate = useNavigate();

	const trigger = (): void => {
		setFlag((prevState) => !prevState);
	};

	const getListTodos = (): Promise<void> => {
		return todoService.getAllTodos().then((data) => setTodosList(data));
	};

	useEffect(() => {
		getListTodos();
	}, [flag]);

	useEffect(() => {
		const handleResize = (): void => {
			setIsMobile(window.innerWidth <= theme.media.mobile);
			setIsTablet(
				window.innerWidth >= theme.media.tablet &&
					window.innerWidth < theme.media.desktop,
			);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const renderListView = (): ReactElement => (
		<div className={containerStyle}>
			<ul className={tableStyle}>
				<li className={tableHeaderStyle}>
					<div
						className={cx(
							tableColumnStyle,
							tableHeaderTitleColumnStyle,
						)}
					>
						Title
					</div>
					<div
						className={cx(
							tableColumnStyle,
							tableHeaderDescriptionStyle,
						)}
					>
						Description
					</div>
					<div
						className={cx(
							tableColumnStyle,
							tableHeaderActionsColumnStyle,
						)}
					>
						Actions
					</div>
				</li>
				{todosList.map((todo) => (
					<li className={tableRowStyle} key={todo.id}>
						<TodosObject todo={todo} trigger={trigger} />
					</li>
				))}
			</ul>
		</div>
	);

	const renderSliderView = (): ReactElement => (
		<Carousel showThumbs={false} showStatus={false}>
			{todosList.map((todo) => (
				<div key={todo.id} className={tableRowStyle}>
					<TodosObject todo={todo} trigger={trigger} />
				</div>
			))}
		</Carousel>
	);

	return (
		<div>
			{isMobile && renderListView()}
			{isTablet && renderSliderView()}
			{!isMobile && !isTablet && renderListView()}
			<Button className={ButtonStyle} onClick={() => navigate('/create')}>
				Create
			</Button>
		</div>
	);
};
