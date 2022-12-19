import styled from 'styled-components';
import Box, { BoxProps } from './Box';

export type FlexProps = BoxProps;

/**
 * Responsive Flexbox container, based on the `Box` component but has `display: flex` by default.
 */
export const Flex = styled(Box)``;

Flex.defaultProps = {
	display: 'flex',
};

export default Flex;
