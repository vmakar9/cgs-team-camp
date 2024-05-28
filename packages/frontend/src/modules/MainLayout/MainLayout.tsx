import React from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayout = (): React.JSX.Element => {
	return (
		<div>
			<Outlet />
		</div>
	);
};
