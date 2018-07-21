import PropTypes from 'prop-types';
import styled from 'react-emotion';
import themeGet from '../util/themeGet';

const QuotedLink = styled('a')`
	color: inherit;
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
	&:focus {
		outline: 1px dotted ${themeGet('colors.hover')};
		outline-offset: 1px;
	}
`;

QuotedLink.propTypes = {
	children: PropTypes.node,
};

/** @component */
export default QuotedLink;
