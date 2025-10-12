import { type ElementType } from 'react';
import {
	stack,
	type StackProperties,
} from '../../styled-system/patterns/stack';
import { createBox, type BoxProps } from './Box';

export type StackProps<C extends ElementType> = Omit<BoxProps<C>, 'className'> &
	StackProperties;

export function Stack<C extends ElementType = 'div'>({
	direction,
	...props
}: StackProps<C>) {
	return createBox<C>({
		...props,
		className: stack({ direction }),
	} as BoxProps<C>);
}
