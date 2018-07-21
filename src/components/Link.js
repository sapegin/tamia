import PropTypes from 'prop-types';
import styled from 'react-emotion';
import themeGet from '../util/themeGet';

const Link = styled('a')`
	&,
	&:link,
	&:visited {
		color: ${themeGet('colors.primary')};
	}
	&:hover,
	&:active,
	&:focus {
		color: ${themeGet('colors.hover')};
	}
	&:focus {
		outline: 1px dotted ${themeGet('colors.hover')};
		outline-offset: 1px;
	}
`;

Link.propTypes = {
	children: PropTypes.node,
};

/** @component */
export default Link;
