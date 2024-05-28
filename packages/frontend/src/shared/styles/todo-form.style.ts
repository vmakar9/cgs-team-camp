import { css } from '@emotion/css';
import { theme } from '~shared/styles/theme';

export const form = css`
	display: flex;
	flex-direction: column;
	padding: ${theme.spacing.medium};
	align-items: center;
	position: relative;
	min-width: 300px;
`;

export const input = css`
	padding: ${theme.spacing.small};
	margin-bottom: ${theme.spacing.medium};
	font-size: ${theme.fontSizes.medium};
	width: 100%;
	height: 100%;
	border: 1px solid ${theme.colors.black};
`;

export const error = css`
	color: red;
	margin: 5px 0;
`;

export const button = css`
	padding: ${theme.spacing.small};
	background-color: ${theme.colors.primary};
	color: white;
	border: none;
	cursor: pointer;
	font-size: ${theme.fontSizes.medium};
`;
