import styled, { DefaultTheme } from 'styled-components';
import {
	space,
	layout,
	typography,
	color,
	shadow,
	variant,
	SpaceProps,
	LayoutProps,
	TypographyProps,
	ColorProps,
	ShadowProps,
	ResponsiveValue,
} from 'styled-system';

type Props = SpaceProps &
	LayoutProps &
	TypographyProps &
	ColorProps &
	ShadowProps & {
		variant?: ResponsiveValue<keyof DefaultTheme['textStyles']>;
	};

export const Text = styled.p<Props>(
	space,
	layout,
	typography,
	color,
	shadow,
	variant({
		scale: 'textStyles',
		prop: 'variant',
	})
);

Text.defaultProps = {
	variant: 'base',
};

/** @component */
export default Text;
