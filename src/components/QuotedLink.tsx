import styled from 'styled-components';
import themeGet from '../util/themeGet';

const QuotedLink = styled('a')`
	padding: 0;
	background: none;
	border: 0;
	color: inherit;
	font-family: inherit;
	text-decoration: none;
	& u,
	&:link u,
	&:visited u {
		text-decoration: underline;
		color: ${themeGet('colors.primary')};
	}
	&:hover u,
	&:active u,
	&:focus u {
		color: ${themeGet('colors.hover')};
	}
	&:hover {
		cursor: pointer;
	}
	&:focus {
		outline: 1px dotted ${themeGet('colors.hover')};
		outline-offset: 1px;
	}
`;

/** @component */
export default QuotedLink;
