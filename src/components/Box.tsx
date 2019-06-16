import styled from '@emotion/styled';
import { space, color, layout, position, flexbox } from 'styled-system';
import {
	BaseProps,
	SpaceProps,
	ColorProps,
	LayoutProps,
	PositionProps,
	FlexboxProps,
} from '../types';

interface Props
	extends BaseProps,
		SpaceProps,
		ColorProps,
		LayoutProps,
		PositionProps,
		FlexboxProps {}

const Box: React.FunctionComponent<Props> = styled('div')<{}>(
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
