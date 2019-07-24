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
