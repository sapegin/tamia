import type { ElementType } from 'react';
import { expander } from '../../styled-system/patterns/expander';
import { createBox, type BoxProps } from './Box';

export type ExpanderProps<C extends ElementType> = Omit<
	BoxProps<C>,
	'className'
>;

/**
 * Expands content horizontally to remove the paddings so it is rendered
 * from edge to edge on small screens.
 */
export function Expander<C extends ElementType>(props: ExpanderProps<C>) {
	return createBox({ ...props, className: expander() });
}
