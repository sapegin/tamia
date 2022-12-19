import styled, { DefaultTheme } from 'styled-components';
import Box, { BoxProps } from './Box';
import { variant, ResponsiveValue } from '../primitives';
import { AsProps } from '../types';
import { TypographyProps } from '../primitives/types';

export type TextProps = BoxProps &
	TypographyProps &
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
	})
);

Text.defaultProps = {
	variant: 'base',
};

export default Text;
