import { css } from '@emotion/css';
import { theme } from '~shared/styles/theme';

export const actionsButoonStyle = css`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: ${theme.spaces.xxsmall};
`;

export const ButtonStyle = css`
	display: flex;
	justify-content: space-between;
	margin-top: ${theme.spaces.large};
`;
