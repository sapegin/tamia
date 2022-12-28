import styled from 'styled-components';
import { boxStyledProps, PROPS_TO_IGNORE, BoxProps } from './Box';
import { getPaddingX } from '../styles/getters';

export type ImageProps = Omit<BoxProps, 'children'> & {
	/** Full bleed on narrow screens */
	expand?: boolean;
};

const ALL_PROPS_TO_IGNORE = [...PROPS_TO_IGNORE, 'expand'];

/**
 * Responsive image.
 */
export const Image = styled.img.withConfig({
	shouldForwardProp: (prop, defaultValidatorFn) =>
		ALL_PROPS_TO_IGNORE.includes(prop) === false && defaultValidatorFn(prop),
})<ImageProps>(
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
