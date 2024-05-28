import { css } from '@emotion/css';
import { theme } from '~shared/styles/theme';

export const containerStyle = css`
	display: flex;
	flex-direction: column;
	gap: ${theme.spaces.large};
`;

export const detailsContainerStyle = css`
	gap: ${theme.spaces.xlarge};
`;

export const backButtonStyle = css`
	max-width: ${theme.width.maxWidth};
`;
