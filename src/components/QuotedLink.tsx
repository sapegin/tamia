import styled from 'styled-components';

/**
 * “Quoted” link component, a link where only content inside the `<u>` tag is underlined. Useful for links in quotes or links with images.
 */
export const QuotedLink = styled.a`
	padding: 0;
	background: none;
	border: 0;
	color: inherit;
	font: inherit;
	text-decoration: none;
	& u,
	&:link u,
	&:visited u {
		text-decoration: underline;
		color: ${p => p.theme.colors.primary};
	}
	&:hover u,
	&:active u,
	&:focus u {
		color: ${p => p.theme.colors.hover};
	}
	&:hover {
		cursor: pointer;
	}
	&:focus {
		outline: 1px dotted ${p => p.theme.colors.hover};
		outline-offset: 1px;
	}
`;

/** @component */
export default QuotedLink;
