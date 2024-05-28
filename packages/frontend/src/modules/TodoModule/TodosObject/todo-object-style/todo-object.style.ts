import { css } from '@emotion/css';
import { theme } from '~shared/styles/theme';

export const tableColumnStyle = css`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	margin: ${theme.spaces.xsmall};
`;
export const tableTitleColumnStyle = css`
	flex-basis: 20%;
`;
export const tableDescriptionStyle = css`
	flex-basis: 40%;
`;
export const tableActionsColumnStyle = css`
	flex-basis: 40%;
`;
