import { type ElementType } from 'react';
import { cva, type RecipeVariantProps } from '../../styled-system/css';
import { createBox, type BoxProps } from './Box';

const heading = cva({
	base: {
		color: 'text',
		fontFamily: 'heading',
		fontWeight: 'bold',
		lineHeight: 'heading',
	},
	variants: {
		level: {
			1: {
				fontSize: 'xl',
			},
			2: {
				fontSize: 'l',
			},
			3: {
				fontSize: 'm',
				fontStyle: 'italic',
			},
		},
	},
});

type HeadingProps<C extends ElementType> = Omit<BoxProps<C>, 'className'> &
	RecipeVariantProps<typeof heading>;

export function Heading<C extends ElementType = 'h1'>({
	level = 1,
	...props
}: HeadingProps<C>) {
	return createBox<C>(
		{
			...props,
			className: heading({ level }),
		} as BoxProps<C>,
		`h${level}`
	);
}
