import styled from 'styled-components';
import {
	system,
	space,
	color,
	border,
	shadow,
	styledSystemLayout,
	position,
	flexbox,
	SpaceProps,
	ColorProps,
	BorderProps,
	ShadowProps,
	LayoutProps,
	PositionProps,
	FlexboxProps,
} from '../system';

export type BoxProps = SpaceProps<'noprefix'> &
	ColorProps<'noprefix'> &
	BorderProps<'noprefix'> &
	ShadowProps<'noprefix'> &
	LayoutProps<'noprefix'> &
	PositionProps<'noprefix'> &
	FlexboxProps;

/**
 * Generic container with responsive props to control whitespace, layout, positioning and colors.
 */
export const Box = styled.div<BoxProps>(
	{
		boxSizing: 'border-box',
		minWidth: 0,
	},
	system({
		...space,
		...color,
		...border,
		...shadow,
		...styledSystemLayout,
		...position,
		...flexbox,
	})
);

export default Box;
