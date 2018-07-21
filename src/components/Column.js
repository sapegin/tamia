import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Base from './Base';

const BREAKPOINTS = {
	default: 0,
	small: 1,
	medium: 2,
	large: 3,
	huge: 4,
};

const push = direction => props => props.push === direction && 'auto';
const breakpoint = breakpoint => props =>
	`min-width: ${props.theme.breakpoints[breakpoint]}`;
const size = breakpoint => props => {
	const width = props.width[BREAKPOINTS[breakpoint]];
	return width && `${width * 100}%`;
};

const Column = styled(Base)`
	margin-left: ${push('right')};
	margin-right: ${push('left')};
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
	/** Array of 1/6, 1/4, 3/3, 1/3, 2/3, 1/2, 1 */
	width: PropTypes.arrayOf(
		PropTypes.oneOf([1 / 6, 1 / 4, 3 / 4, 1 / 3, 2 / 3, 1 / 2, 1])
	),
	align: PropTypes.oneOf(['center', 'right']),
	push: PropTypes.oneOf(['left', 'right']),
	className: PropTypes.string,
	is: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	children: PropTypes.node,
};

Column.defaultProps = {
	width: [],
	is: 'div',
};

/** @component */
export default Column;
