import React from 'react';
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
import { AsProps } from '../types';

type Props = SpaceProps &
	LayoutProps &
	TypographyProps & {
		level?: ResponsiveValue<keyof DefaultTheme['headingStyles']>;
	};

const HeadingBase: React.FunctionComponent<Props & AsProps> = ({
	level,
	as: Component = `h${level}`,
	...props
}) => <Component {...props} />;

export const Heading = styled(HeadingBase)<Props>(
	variant({
		scale: 'headingStyles',
		prop: 'level',
		// @ts-ignore
		// Trigger the new styled-system variants API
		// Actual variant to be defined in site-specific themes
		variants: { _: {} },
	}),
	space,
	layout,
	typography
);

Heading.defaultProps = {
	level: 1,
};

export default Heading;
