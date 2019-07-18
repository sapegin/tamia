import styled, { DefaultTheme } from 'styled-components';
import {
	space,
	layout,
	typography,
	variant,
	SpaceProps,
	LayoutProps,
	TypographyProps,
	ResponsiveValue,
} from 'styled-system';

type Props = SpaceProps &
	LayoutProps &
	TypographyProps & {
		variant?: ResponsiveValue<keyof DefaultTheme['textStyles']>;
	};

export const Text = styled.p<Props>(
	space,
	layout,
	typography,
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
