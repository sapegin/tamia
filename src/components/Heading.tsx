import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import {
	compose,
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

/**
 * Heading component.
 */
export const Heading = styled(HeadingBase)<Props>(
	compose(
		variant({
			scale: 'headingStyles',
			prop: 'level',
			// Trigger the new styled-system variants API
			// Actual variants to be defined in site-specific themes
			variants: { _: {} },
		}),
		space,
		layout,
		typography
	)
);

Heading.defaultProps = {
	level: 1,
};

export default Heading;
