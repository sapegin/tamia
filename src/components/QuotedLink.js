import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import themeGet from '../util/themeGet';
import Base from './Base';

const SIZES = ['xxl', 'xl', 'l', 'm', 's', 'xs'];

const QuotedLink = styled(Base)`
	padding: 0;
	padding-top: ${props => props.theme.space[props.py || props.p]};
	padding-bottom: ${props => props.theme.space[props.py || props.p]};
	padding-left: ${props => props.theme.space[props.px || props.p]};
	padding-right: ${props => props.theme.space[props.px || props.p]};
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

QuotedLink.propTypes = {
	children: PropTypes.node,
	p: PropTypes.oneOf(SIZES),
	px: PropTypes.oneOf(SIZES),
	py: PropTypes.oneOf(SIZES),
	as: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
	/** @ignore */
	blacklist: PropTypes.array,
};

QuotedLink.defaultProps = {
	as: 'a',
	blacklist: Object.keys(QuotedLink.propTypes),
};

/** @component */
export default QuotedLink;
