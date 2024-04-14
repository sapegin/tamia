import { type ElementType } from 'react';
import { grid, type GridProperties } from '../../styled-system/patterns/grid';
import { createBox, type BoxProps } from './Box';

export type GridProps<C extends ElementType> = Omit<BoxProps<C>, 'className'> &
	GridProperties;

export function Grid<C extends ElementType>({ auto, ...props }: GridProps<C>) {
	return createBox({ ...props, className: grid({ auto }) });
}
