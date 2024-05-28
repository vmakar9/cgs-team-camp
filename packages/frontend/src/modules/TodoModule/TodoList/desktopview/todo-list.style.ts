import { theme } from '~shared/styles/theme';
import { css } from '@emotion/css';

export const containerStyle = css`
	margin-left: auto;
	margin-right: auto;
	padding-left: ${theme.spaces.xsmall};
	padding-right: ${theme.spaces.xsmall};
	@media (max-width: ${theme.media.mobile}px) {
		padding-left: ${theme.spaces.small};
		padding-right: ${theme.spaces.small};
	}
`;

export const tableStyle = css`
	overflow-y: auto;
	max-height: ${theme.spaces.xxlargeVh};
	li {
		border-radius: ${theme.radius.small};
		padding: ${theme.spaces.xlarge} ${theme.spaces.large};
		display: flex;
		justify-content: space-between;
		margin-bottom: ${theme.spaces.xlarge};
		@media (max-width: ${theme.media.mobile}px) {
			flex-direction: column;
			align-items: flex-start;
			padding: ${theme.spaces.medium} ${theme.spaces.small};
		}
	}
`;

export const tableHeaderStyle = css`
	position: sticky;
	top: 0;
	z-index: 5;
	background-color: ${theme.colors.muted};
	font-size: ${theme.fontSizes.small};
	text-transform: uppercase;
	letter-spacing: 0.03em;
`;

export const tableRowStyle = css`
	background-color: ${theme.colors.white};
	box-shadow: ${theme.boxShadow.light};
	@media (max-width: ${theme.media.mobile}px) {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: ${theme.spaces.medium};
	}
`;

export const tableColumnStyle = css`
	margin: ${theme.spaces.xxsmall};
	@media (max-width: ${theme.media.mobile}px) {
		margin-bottom: ${theme.spaces.small};
	}
`;

export const tableHeaderTitleColumnStyle = css`
	flex-basis: 20%;
	@media (max-width: ${theme.media.mobile}px) {
		flex-basis: 100%;
	}
`;

export const tableHeaderDescriptionStyle = css`
	flex-basis: 70%;
	@media (max-width: ${theme.media.mobile}px) {
		flex-basis: 100%;
	}
`;

export const tableHeaderActionsColumnStyle = css`
	flex-basis: 22%;
	@media (max-width: ${theme.media.mobile}px) {
		flex-basis: 100%;
		display: flex;
		justify-content: space-between;
	}
`;
