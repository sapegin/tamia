import styled from 'styled-components';
import {
	grid,
	system,
	GridProps,
	ResponsiveValue,
	TLengthStyledSystem,
} from 'styled-system';
import Box, { BoxProps } from './Box';

type Props = BoxProps &
	GridProps & {
		/** Minimum width of a child, will create responsive CSS Grid layout like
		 * `grid-template-columns: repeat(auto-fit, minmax($minColumnWidth$)}, 1fr))`.
		 * (You can use either this prop or `numColumns` but not both.)
		 */
		minColumnWidth?: ResponsiveValue<TLengthStyledSystem>;
		/** Number of columns, will create a responsive CSS Grid layout like
		 * `grid-template-columns: repeat($numColumns$, 1fr))`.
		 * (You can use either this prop or `minColumnWidth` but not both.)
		 */
		numColumns?: ResponsiveValue<number>;
	};

const px = (value: TLengthStyledSystem): string =>
	typeof value === 'number' ? `${value}px` : value;

const getMinMaxValue = (
	value: TLengthStyledSystem,
	scale: TLengthStyledSystem[] = []
) => px(scale[value as number] || value);

/**
 * Generic CSS Grid layout component. Based on the `Box` component but with `display: grid` by default.
 */
export const Grid = styled(Box)<Props>(
	grid,
	system({
		minColumnWidth: {
			property: 'gridTemplateColumns',
			scale: 'space',
			transform: (value, scale) =>
				value
					? `repeat(auto-fit, minmax(${getMinMaxValue(
							value,
							scale as TLengthStyledSystem[]
					  )}, 1fr))`
					: null,
		},
		numColumns: {
			property: 'gridTemplateColumns',
			transform: value => (value ? `repeat(${value}, 1fr)` : null),
		},
	})
);

Grid.defaultProps = {
	display: 'grid',
};

/** @component */
export default Grid;
