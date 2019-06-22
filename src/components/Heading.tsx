import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import {
	space,
	textAlign,
	variant,
	SpaceProps,
	TextAlignProps,
	ResponsiveValue,
} from 'styled-system';
import { AsProps } from '../types';

type Props = SpaceProps &
	TextAlignProps & {
		level?: ResponsiveValue<keyof DefaultTheme['headingStyles']>;
	};

const HeadingBase: React.FunctionComponent<Props & AsProps> = ({
	level,
	as: Component = `h${level}`,
	...props
}) => <Component {...props} />;

const Heading = styled(HeadingBase)<Props>(
	space,
	textAlign,
	variant({
		scale: 'headingStyles',
		prop: 'level',
	})
);

Heading.defaultProps = {
	level: 1,
};

/** @component */
export default Heading;
