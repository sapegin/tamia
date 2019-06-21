import styled from 'styled-components';
import {
	space,
	color,
	layout,
	position,
	flexbox,
	SpaceProps,
	LayoutProps,
	PositionProps,
	FlexboxProps,
	ColorProps,
} from 'styled-system';

type Props = SpaceProps &
	ColorProps &
	LayoutProps &
	PositionProps &
	FlexboxProps;

const Box = styled.div<Props>(
	{
		boxSizing: 'border-box',
	},
	space,
	color,
	layout,
	position,
	flexbox
);

/** @component */
export default Box;
