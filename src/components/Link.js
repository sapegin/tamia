import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import themeGet from '../util/themeGet';
import Base from './Base';

const SIZES = ['xxl', 'xl', 'l', 'm', 's', 'xs'];

const Link = styled(Base)`
	&,
	&:link,
	&:visited {
		padding: 0;
		padding-top: ${props => props.theme.space[props.py || props.p]};
		padding-bottom: ${props => props.theme.space[props.py || props.p]};
		padding-left: ${props => props.theme.space[props.px || props.p]};
		padding-right: ${props => props.theme.space[props.px || props.p]};
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

Link.propTypes = {
	children: PropTypes.node,
	p: PropTypes.oneOf(SIZES),
	px: PropTypes.oneOf(SIZES),
	py: PropTypes.oneOf(SIZES),
	as: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
	/** @ignore */
	blacklist: PropTypes.array,
};

Link.defaultProps = {
	as: 'a',
	blacklist: Object.keys(Link.propTypes),
};

/** @component */
export default Link;
