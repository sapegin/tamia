import styled from 'styled-components';
import { boxStyledProps, boxStyledCofig, BoxProps } from './Box';
import { getPaddingX } from '../styles/getters';

export type ImageProps = Omit<BoxProps, 'children'> & {
	/** Full bleed on narrow screens */
	expand?: boolean;
};

/**
 * Responsive image.
 */
export const Image = styled.img.withConfig(
	boxStyledCofig(['expand'])
)<ImageProps>(
	boxStyledProps,
	(props) =>
		props.expand !== false && {
			[`@media (max-width: ${props.theme.breakpoints[0]})`]: {
				maxWidth: '100vw',
				marginLeft: `-${getPaddingX(props)}`,
				marginRight: `-${getPaddingX(props)}`,
			},
		}
);

Image.defaultProps = {
	maxWidth: '100%',
	height: 'auto',
};

export default Image;
