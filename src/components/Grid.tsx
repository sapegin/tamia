import styled from 'styled-components';
import { boxStyledProps, PROPS_TO_IGNORE, BoxProps } from './Box';

export type GridProps = BoxProps;

/**
 * Generic CSS Grid layout component. Based on the `Box` component but with `display: grid` by default.
 */
export const Grid = styled.div.withConfig({
	shouldForwardProp: (prop, defaultValidatorFn) =>
		PROPS_TO_IGNORE.includes(prop) === false && defaultValidatorFn(prop),
})<GridProps>(boxStyledProps);

Grid.defaultProps = { display: 'grid' };

export default Grid;
