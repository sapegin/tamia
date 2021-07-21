import styled from 'styled-components';
import { Property } from 'csstype';
import { grid, system, GridProps, SystemProp } from '../system';
import Box, { BoxProps } from './Box';

type Props = BoxProps &
	GridProps & {
		/**
		 * Minimum width of a child, will create responsive CSS Grid layout like
		 * `grid-template-columns: repeat(auto-fit, minmax($minColumnWidth$)}, 1fr))`.
		 * (You can use either this prop or `numColumns` but not both.)
		 */
		minColumnWidth?: SystemProp<Property.Width>;
		/**
		 * Number of columns, will create a responsive CSS Grid layout like
		 * `grid-template-columns: repeat($numColumns$, 1fr))`.
		 * (You can use either this prop or `minColumnWidth` but not both.)
		 */
		numColumns?: SystemProp<number>;
	};

const px = (value: Property.Width): string =>
	typeof value === 'number' ? `${value}px` : value;

const getMinMaxValue = (value: Property.Width, scale: Property.Width[] = []) =>
	px(scale[value as number] || value);

/**
 * Generic CSS Grid layout component. Based on the `Box` component but with `display: grid` by default.
 */
export const Grid = styled(Box)<Props>(
	system({
		...grid,
		minColumnWidth: {
			property: 'gridTemplateColumns',
			scale: 'space',
			transform: ({ path, object }) =>
				path
					? `repeat(auto-fit, minmax(${getMinMaxValue(path, object)}, 1fr))`
					: null,
		},
		numColumns: {
			property: 'gridTemplateColumns',
			transform: ({ path }) => (path ? `repeat(${path}, 1fr)` : null),
		},
	})
);

Grid.defaultProps = {
	display: 'grid',
};

/** @component */
export default Grid;
