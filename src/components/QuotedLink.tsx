import type { ElementType } from 'react';
import { quotedLink } from '../../styled-system/patterns/quoted-link';
import { createBox, type BoxProps } from './Box';

export type QuotedLinkProps<C extends ElementType> = Omit<
	BoxProps<C>,
	'className'
>;

/**
 * “Quoted” link component, a link where only content inside the `<u>` tag is underlined. Useful for links in quotes or links with images.
 */
export function QuotedLink<C extends ElementType = 'a'>(
	props: QuotedLinkProps<C>
) {
	return createBox({ ...props, className: quotedLink() }, 'a');
}
