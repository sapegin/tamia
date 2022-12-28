import styled, { DefaultTheme } from 'styled-components';
import { boxStyledProps, PROPS_TO_IGNORE, BoxProps } from './Box';
import { variant, getCss, ResponsiveValue } from '../primitives';
import { TypographyCoreProps, FontWeightProps } from '../primitives/types';

export type TextProps = BoxProps &
	TypographyCoreProps &
	FontWeightProps & {
		variant?: ResponsiveValue<keyof DefaultTheme['textStyles']>;
	};

const ALL_PROPS_TO_IGNORE = [
	...PROPS_TO_IGNORE,
	'textAlign',
	'fontStyle',
	'fontWeight',
];

/**
 * Text component.
 */
export const Text = styled.p.withConfig({
	shouldForwardProp: (prop, defaultValidatorFn) =>
		ALL_PROPS_TO_IGNORE.includes(prop) === false && defaultValidatorFn(prop),
})<TextProps>(
	variant({
		scale: 'textStyles',
		prop: 'variant',
	}),
	boxStyledProps,
	({ theme, textAlign, fontStyle, fontWeight }) => {
		return getCss(
			{
				textAlign,
				fontStyle,
				fontWeight,
			},
			theme
		);
	}
);

Text.defaultProps = {
	boxSizing: 'border-box',
	variant: 'base',
};

export default Text;
