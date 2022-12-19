import styled from 'styled-components';
import Box, { BoxProps } from './Box';

export type GridProps = BoxProps;

/**
 * Generic CSS Grid layout component. Based on the `Box` component but with `display: grid` by default.
 */
export const Grid = styled(Box)``;

Grid.defaultProps = { display: 'grid' };

export default Grid;
