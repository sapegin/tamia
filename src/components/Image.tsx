import styled from 'styled-components';
import {
	compose,
	space,
	color,
	border,
	shadow,
	layout,
	position,
	flexbox,
	SpaceProps,
	ColorProps,
	BorderProps,
	ShadowProps,
	LayoutProps,
	PositionProps,
	FlexboxProps,
} from 'styled-system';

type Props = SpaceProps &
	ColorProps &
	BorderProps &
	ShadowProps &
	LayoutProps &
	PositionProps & {
		expand: boolean;
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
				marginLeft: `-${p.theme.page.xPadding}`,
				marginRight: `-${p.theme.page.xPadding}`,
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
