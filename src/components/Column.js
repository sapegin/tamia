import PropTypes from 'prop-types';
import styled from 'styled-components';
import Base from './Base';

const BREAKPOINTS = {
	default: 0,
	small: 1,
	medium: 2,
	large: 3,
	huge: 4,
};

export const space = props =>
	props.narrow ? props.theme.space.s : props.theme.space.m;
const breakpoint = breakpoint => props =>
	`min-width: ${props.theme.breakpoints[breakpoint]}`;
const size = breakpoint => props =>
	`calc(100% * ${props.width[BREAKPOINTS[breakpoint]]})`;

const Column = styled(Base)`
	padding-left: ${space};
	padding-right: ${space};
	display: block;
	text-align: ${props => props.align};
	width: ${size('default')};
	@media (${breakpoint('small')}) {
		width: ${size('small')};
	}
	@media (${breakpoint('medium')}) {
		width: ${size('medium')};
	}
	@media (${breakpoint('large')}) {
		width: ${size('large')};
	}
	@media (${breakpoint('huge')}) {
		width: ${size('huge')};
	}
`;

Column.propTypes = {
	width: PropTypes.arrayOf(
		PropTypes.oneOf([1 / 6, 1 / 4, 3 / 4, 1 / 3, 2 / 3, 1 / 2, 1])
	),
	narrow: PropTypes.bool,
	align: PropTypes.oneOf(['center', 'right']),
	className: PropTypes.string,
	is: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	children: PropTypes.node,
};

Column.defaultProps = {
	is: 'div',
};

export default Column;
