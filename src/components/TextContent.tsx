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
export function TextContent({ variant, ...props }: TextContentProps) {
	return createBox({
		...props,
		className: cx(textContent(), textContentCustom({ variant })),
	});
}
