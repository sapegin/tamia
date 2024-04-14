import { type ElementType } from 'react';
import { flex } from '../../styled-system/patterns/flex';
import { createBox, type BoxProps } from './Box';

export type FlexProps<C extends ElementType> = Omit<BoxProps<C>, 'className'>;

export function Flex<C extends ElementType = 'div'>(props: FlexProps<C>) {
	return createBox({ ...props, className: flex() });
}
