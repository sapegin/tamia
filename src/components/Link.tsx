import type { ElementType } from 'react';
import { link } from '../../styled-system/patterns/link';
import { createBox, type BoxProps } from './Box';

export type LinkProps<C extends ElementType> = Omit<BoxProps<C>, 'className'>;

/**
 * Text link.
 */
export function Link<C extends ElementType = 'a'>(props: LinkProps<C>) {
	return createBox({ ...props, className: link() }, 'a');
}
