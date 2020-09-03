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
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
		color: ${p => p.theme.colors.primary};
		text-decoration: underline;
	}
	&:hover,
	&:active {
		color: ${p => p.theme.colors.hover};
		cursor: pointer;
	}
	&:focus {
		outline: ${p => p.theme.borders.focus};
		outline-color: ${p => p.theme.colors.focus};
		outline-offset: ${p => p.theme.focusOutlineOffset};
	}
`;

/** @component */
export default Link;
