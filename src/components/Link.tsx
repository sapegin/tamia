import styled from 'styled-components';

/**
 * Link component.
 */
export const Link = styled.a`
	&,
	&:link,
	&:visited {
		padding: 0;
		background: none;
		border: 0;
		font: inherit;
		color: ${p => p.theme.colors.primary};
		text-decoration: underline;
	}
	&:hover,
	&:active,
	&:focus {
		color: ${p => p.theme.colors.hover};
		cursor: pointer;
	}
	&:focus {
		outline: 1px dotted;
		outline-offset: 1px;
	}
`;

/** @component */
export default Link;
