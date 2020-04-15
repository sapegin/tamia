import styled from 'styled-components';
import {
	compose,
	space,
	color,
	border,
	shadow,
	layout,
	position,
	SpaceProps,
	ColorProps,
	BorderProps,
	ShadowProps,
	LayoutProps,
	PositionProps,
} from 'styled-system';
import { getPaddingX } from '../styles/getters';

type Props = SpaceProps &
	ColorProps &
	BorderProps &
	ShadowProps &
	LayoutProps &
	PositionProps & {
		expand?: boolean;
	};

/**
 * Responsive image.
 */
export const Image = styled.img<Props>(
	{
		maxWidth: '100%',
		height: 'auto',
	},
	p =>
		p.expand && {
			[`@media (max-width: ${p.theme.breakpoints[0]})`]: {
				maxWidth: '100vw',
				marginLeft: `-${getPaddingX(p)}`,
				marginRight: `-${getPaddingX(p)}`,
			},
		},
	compose(space, color, border, shadow, layout, position)
);

Image.defaultProps = {
	alt: '',
	/** Make the image full bleed on narrow screens */
	expand: true,
};

export default Image;
