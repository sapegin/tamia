import styled from 'styled-components';
import Box, { BoxProps } from './Box';

/**
 * Responsive Flexbox container, based on the `Box` component but has `display: flex` by default.
 */
export const Flex = styled(Box)<BoxProps>({
	display: 'flex',
});

export default Flex;
