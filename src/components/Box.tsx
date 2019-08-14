import styled from 'styled-components';
import {
	space,
	color,
	shadow,
	layout,
	position,
	flexbox,
	SpaceProps,
	ColorProps,
	ShadowProps,
	LayoutProps,
	PositionProps,
	FlexboxProps,
} from 'styled-system';

type Props = SpaceProps &
	ColorProps &
	ShadowProps &
	LayoutProps &
	PositionProps &
	FlexboxProps;

/**
 * Generic container with responsive props to control whitespace, layout, positioning and colors.
 */
export const Box = styled.div<Props>(
	{
		boxSizing: 'border-box',
	},
	space,
	color,
	shadow,
	layout,
	position,
	flexbox
);

export default Box;
