import styled, { DefaultTheme } from 'styled-components';
import {
	compose,
	space,
	layout,
	typography,
	color,
	border,
	shadow,
	variant,
	SpaceProps,
	LayoutProps,
	TypographyProps,
	ColorProps,
	BorderProps,
	ShadowProps,
	ResponsiveValue,
} from 'styled-system';

type Props = SpaceProps &
	LayoutProps &
	TypographyProps &
	ColorProps &
	BorderProps &
	ShadowProps & {
		variant?: ResponsiveValue<keyof DefaultTheme['textStyles']>;
	};

/**
 * Text component.
 */
export const Text = styled.p<Props>(
	{
		boxSizing: 'border-box',
	},
	compose(
		variant({
			scale: 'textStyles',
			prop: 'variant',
			// Trigger the new styled-system variants API
			// Actual variant to be defined in site-specific themes
			variants: { _: {} },
		}),
		space,
		layout,
		typography,
		color,
		border,
		shadow
	)
);

Text.defaultProps = {
	variant: 'base',
};

/** @component */
export default Text;
