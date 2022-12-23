import styled, { DefaultTheme } from 'styled-components';
import { boxStyledProps, boxStyledCofig, BoxProps } from './Box';
import { variant, getCss, ResponsiveValue } from '../primitives';
import { TypographyCoreProps, FontWeightProps } from '../primitives/types';

export type TextProps = BoxProps &
	TypographyCoreProps &
	FontWeightProps & {
		variant?: ResponsiveValue<keyof DefaultTheme['textStyles']>;
	};

/**
 * Text component.
 */
export const Text = styled.p.withConfig(boxStyledCofig)<TextProps>(
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
