import PropTypes from 'prop-types';
import styled from 'react-emotion';
import themeGet from '../util/themeGet';
import Base from './Base';

const Link = styled(Base)`
	&,
	&:link,
	&:visited {
		padding: 0;
		background: none;
		border: 0;
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

Link.propTypes = {
	children: PropTypes.node,
	is: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
	/** @ignore */
	blacklist: PropTypes.array,
};

Link.defaultProps = {
	is: 'a',
	blacklist: Object.keys(Link.propTypes),
};

/** @component */
export default Link;
