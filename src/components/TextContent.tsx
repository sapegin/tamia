import type { ElementType } from 'react';
import { cva, cx, type RecipeVariantProps } from '../../styled-system/css';
import { textContent } from '../../styled-system/patterns/text-content';
import { createBox, type BoxProps } from './Box';

const textContentCustom = cva({
	base: {},
	variants: {
		variant: {
			small: {
				'& p': {
					fontSize: 's',
				},
			},
			intro: {
				'& p': {
					fontSize: 'l',
					fontStyle: 'italic',
				},
			},
		},
	},
});

type TextContentProps = Omit<BoxProps<'div'>, 'className'> &
	RecipeVariantProps<typeof textContentCustom>;

/**
 * Container for user generated content with styles for all common HTML elements.
 */
export function TextContent<C extends ElementType = 'div'>({
	variant,
	...props
}: TextContentProps) {
	return createBox<C>({
		...props,
		className: cx(textContent(), textContentCustom({ variant })),
	} as BoxProps<C>);
}
