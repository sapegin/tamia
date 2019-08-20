import styled from 'styled-components';
import Box from './Box';
import {
	SpaceProps,
	ColorProps,
	LayoutProps,
	FlexboxProps,
	TLengthStyledSystem,
} from 'styled-system';
import { GapProperty } from 'csstype';

type TLength = TLengthStyledSystem;

type Props = SpaceProps &
	ColorProps &
	LayoutProps &
	FlexboxProps & {
		gap: GapProperty<TLength>;
	};

type Value = string | number;

const px = (value: Value): string =>
	typeof value === 'string' ? value : `${value || 0}px`;

const getMarginValue = (margin: Value, gap: Value): Value =>
	gap ? `calc(${px(margin)} - ${px(gap)} / 2)` : margin || 0;

const getGapValue = (gap: Value): string => `calc(${px(gap)} / 2)`;

/**
 * Responsive Flexbox container, based on the `Box` component but has `display: flex` by default.
 */
export const Flex = styled(Box)<Props>(p => {
	const space: { [key: string]: string } = p.theme.space;
	const gap = space[p.gap];
	const marginTop =
		space[(p.mt as TLength) || (p.my as TLength) || (p.m as TLength)];
	const marginRight =
		space[(p.mr as TLength) || (p.mx as TLength) || (p.m as TLength)];
	const marginBottom =
		space[(p.mb as TLength) || (p.my as TLength) || (p.m as TLength)];
	const marginLeft =
		space[(p.ml as TLength) || (p.mx as TLength) || (p.m as TLength)];
	return {
		marginTop: getMarginValue(marginTop, gap),
		marginRight: getMarginValue(marginRight, gap),
		marginBottom: getMarginValue(marginBottom, gap),
		marginLeft: getMarginValue(marginLeft, gap),
		'> *': {
			margin: getGapValue(gap),
		},
	};
});

Flex.defaultProps = {
	display: 'flex',
};

export default Flex;
