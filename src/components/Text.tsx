import styled, { DefaultTheme } from 'styled-components';
import Box, { BoxProps } from './Box';
import { variant, getCss, ResponsiveValue } from '../primitives';
import { AsProps } from '../types';
import { TypographyCoreProps, FontWeightProps } from '../primitives/types';

export type TextProps = BoxProps &
	TypographyCoreProps &
	FontWeightProps &
	AsProps & {
		variant?: ResponsiveValue<keyof DefaultTheme['textStyles']>;
	};

/**
 * Text component.
 */
export const Text = styled(Box).attrs<TextProps>((props) => ({
	as: props.as ?? 'p',
}))<TextProps>(
	variant({
		scale: 'textStyles',
		prop: 'variant',
	}),
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
	variant: 'base',
};

export default Text;
