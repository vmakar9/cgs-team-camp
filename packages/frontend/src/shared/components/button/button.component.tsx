import * as React from 'react';

import { Button as ButtonBase, ButtonProps } from '@blueprintjs/core';
import { btnStyles } from './button.styles';
import classNames from 'classnames';

interface ButtonWrapperProps extends ButtonProps {
	className: string;
}

const Button: React.FC<ButtonWrapperProps> = ({
	children,
	className,
	...props
}) => {
	return (
		<ButtonBase className={classNames(btnStyles, className)} {...props}>
			{children}
		</ButtonBase>
	);
};

export default Button;
