import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import Base from './Base';

const BREAKPOINTS = {
	default: 0,
	small: 1,
	medium: 2,
	large: 3,
	huge: 4,
};
const BREAKPOINT_NAMES = Object.keys(BREAKPOINTS);

const push = direction => props => props.push === direction && 'auto';
const size = breakpoint => props => {
	const width = props.width[BREAKPOINTS[breakpoint]];
	return width && `${width * 100}%`;
};

const Column = styled(Base)`
	margin-left: ${push('right')};
	margin-right: ${push('left')};
	text-align: ${props => props.align};
	width: ${size('default')};
	${props =>
		BREAKPOINT_NAMES.map(breakpoint => {
			const width = size(breakpoint)(props);
			return (
				width &&
				css`
					@media (min-width: ${props.theme.breakpoints[breakpoint]}) {
						width: ${width};
					}
				`
			);
		})};
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
	/** @ignore */
	blacklist: PropTypes.array,
};

Column.defaultProps = {
	width: [],
	is: 'div',
	blacklist: Object.keys(Column.propTypes),
};

/** @component */
export default Column;
