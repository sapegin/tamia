import styled, { DefaultTheme } from 'styled-components';
import { ResponsiveValue, variant } from '../primitives';
import { AsProps } from '../types';
import Box, { BoxProps } from './Box';

export type HeadingProps = BoxProps &
	AsProps & {
		level?: ResponsiveValue<keyof DefaultTheme['headingStyles']>;
	};

/**
 * Heading component.
 */
export const Heading = styled(Box).attrs<HeadingProps>((props) => ({
	as: props.as ?? `h${props.level}`,
}))<HeadingProps>(
	variant({
		scale: 'headingStyles',
		prop: 'level',
	})
);

Heading.defaultProps = {
	level: 1,
};

export default Heading;
