import styled from 'styled-components';
import { boxStyledProps, boxStyledCofig, BoxProps } from './Box';

export type GridProps = BoxProps;

/**
 * Generic CSS Grid layout component. Based on the `Box` component but with `display: grid` by default.
 */
export const Grid =
	styled.div.withConfig(boxStyledCofig)<GridProps>(boxStyledProps);

Grid.defaultProps = { display: 'grid' };

export default Grid;
