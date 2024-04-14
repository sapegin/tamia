import { type ElementType } from 'react';
import { cva, type RecipeVariantProps } from '../../styled-system/css';
import { createBox, type BoxProps } from './Box';

const text = cva({
	base: {
		fontFamily: 'body',
		fontWeight: 'normal',
		lineHeight: 'body',
	},
	variants: {
		variant: {
			body: {
				fontSize: 'm',
				color: 'text',
			},
			disclaimer: {
				fontSize: 's',
				color: 'secondary',
			},
			error: {
				fontSize: 'm',
				color: 'error',
			},
		},
	},
});

export type TextProps<C extends ElementType> = Omit<BoxProps<C>, 'className'> &
	RecipeVariantProps<typeof text>;

export function Text<C extends ElementType = 'p'>({
	variant = 'body',
	...props
}: TextProps<C>) {
	return createBox(
		{
			...props,
			className: text({ variant }),
		},
		'p'
	);
}
