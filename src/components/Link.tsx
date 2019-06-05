import styled from '@emotion/styled';
import themeGet from '../util/themeGet';

const Link = styled('a')`
	&,
	&:link,
	&:visited {
		padding: 0;
		background: none;
		border: 0;
		font-family: inherit;
		color: ${themeGet('colors.primary')};
		text-decoration: underline;
	}
	&:hover,
	&:active,
	&:focus {
		color: ${themeGet('colors.hover')};
		cursor: pointer;
	}
	&:focus {
		outline: 1px dotted ${themeGet('colors.hover')};
		outline-offset: 1px;
	}
`;

/** @component */
export default Link;
