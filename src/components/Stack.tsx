import styled from '@emotion/styled';
import { grid, system } from 'styled-system';
import { GridGapProperty } from 'csstype';
import Box from './Box';
import {
	Length,
	NumberProp,
	BaseProps,
	SpaceProps,
	ColorProps,
	LayoutProps,
	FlexboxProps,
	GridProps,
} from '../types';

const px = (value: Length): string =>
	typeof value === 'number' ? `${value}px` : value;

const getMinMaxValue = (value: Length, scale: Length[] = []): string =>
	px(scale[value as any] || value);

interface Props
	extends BaseProps,
		SpaceProps,
		ColorProps,
		LayoutProps,
		FlexboxProps,
		GridProps {
	/** Gap between children */
	gap?: GridGapProperty<Length> | GridGapProperty<Length>[];
	/** Minimum width of a child */
	minColumnWidth?: NumberProp;
}

const Stack: React.FunctionComponent<Props> = styled(Box)<{}>(
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
