import styled from 'styled-components';
import {
	grid,
	system,
	SpaceProps,
	ColorProps,
	LayoutProps,
	FlexboxProps,
	GridProps,
	ResponsiveValue,
	TLengthStyledSystem,
} from 'styled-system';
import Box from './Box';
import { GridGapProperty } from 'csstype';
import { Length, NumberProp } from '../types';

const px = (value: Length): string =>
	typeof value === 'number' ? `${value}px` : value;

const getMinMaxValue = (value: Length, scale: Length[] = []): string =>
	px(scale[value as any] || value);

type Props = SpaceProps &
	ColorProps &
	LayoutProps &
	FlexboxProps &
	GridProps & {
		/** Gap between children */
		gap?: ResponsiveValue<GridGapProperty<TLengthStyledSystem>>;
		/** Minimum width of a child */
		minColumnWidth?: NumberProp;
	};

const Stack = styled(Box)<Props>(
	{
		display: 'grid',
	},
	grid,
	system({
		gap: {
			property: 'gridGap',
			scale: 'space',
		},
		minColumnWidth: {
			property: 'gridTemplateColumns',
			scale: 'space',
			transform: (value, scale) =>
				value
					? `repeat(auto-fit, minmax(${getMinMaxValue(
							value,
							scale as Length[]
					  )}, 1fr))`
					: null,
		},
	})
);

Stack.defaultProps = {
	gap: 's',
};

/** @component */
export default Stack;
