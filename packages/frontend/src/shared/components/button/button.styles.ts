import { css } from '@emotion/css';
import { theme } from '~shared/styles/theme';

export const btnStyles = css`
	font-size: ${theme.fontSizes.small};
	font-weight: 600;
	line-height: 1.25rem;
	padding: ${theme.spaces.small} ${theme.spaces.medium};
	color: ${theme.colors.white};
	background-color: ${theme.colors.primary};
	border: none;
	border-radius: ${theme.radius.medium};
	box-shadow: ${theme.boxShadow.medium};
	text-align: center;
	cursor: pointer;
	transition:
		background-color 0.3s ease,
		box-shadow 0.3s ease;

	&:hover {
		background-color: ${theme.colors.dark};
		box-shadow: ${theme.boxShadow.heavy};
	}

	&:disabled {
		background-color: ${theme.colors.muted};
		cursor: not-allowed;
	}
`;
