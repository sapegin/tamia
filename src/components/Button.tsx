import { type ElementType } from 'react';
import { cva, type RecipeVariantProps } from '../../styled-system/css';
import { createBox, type BoxProps } from './Box';

const button = cva({
	base: {
		display: 'inline-block',
		width: '100%',
		height: '2rem',
		px: 'm',
		py: 'xs',
		border: `thin`,
		borderColor: 'primary',
		borderRadius: 'button',
		fontSize: 'm',
		fontFamily: 'body',
		textDecoration: 'none',
		textAlign: 'center',
		_hover: {
			outline: 0,
			color: 'background',
			borderColor: 'accent',
			backgroundColor: 'accent',
			cursor: 'pointer',
		},
		_focusVisible: {
			outline: 'focus',
			outlineOffset: 'token(borderWidths.focusOutlineOffset)',
		},
		_disabled: {
			opacity: 0.6,
			filter: 'saturate(60%)',
		},
	},
	variants: {
		variant: {
			primary: {
				color: 'background',
				backgroundColor: 'primary',
			},
			secondary: {
				color: 'primary',
				backgroundColor: 'background',
			},
		},
	},
});

export type ButtonProps<C extends ElementType> = Omit<
	BoxProps<C>,
	'className'
> &
	RecipeVariantProps<typeof button>;

export function Button<C extends ElementType = 'button'>({
	variant = 'secondary',
	...props
}: ButtonProps<C>) {
	return createBox(
		{
			...props,
			className: button({ variant }),
		},
		'button'
	);
}
