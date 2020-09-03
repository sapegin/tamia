import styled from 'styled-components';

/**
 * “Quoted” link component, a link where only content inside the `<u>` tag is underlined. Useful for links in quotes or links with images.
 */
export const QuotedLink = styled.a`
	padding: 0;
	background: none;
	border: 0;
	color: inherit;
	font-family: inherit;
	font-size: inherit;
	line-height: inherit;
	text-decoration: none;
	& u,
	&:link u,
	&:visited u {
		text-decoration: underline;
		color: ${p => p.theme.colors.primary};
	}
	&:hover u,
	&:active u {
		color: ${p => p.theme.colors.hover};
	}
	&:hover {
		cursor: pointer;
	}
	&:focus {
		outline: ${p => p.theme.borders.focus};
		outline-color: ${p => p.theme.colors.focus};
		outline-offset: ${p => p.theme.focusOutlineOffset};
	}
`;

/** @component */
export default QuotedLink;
