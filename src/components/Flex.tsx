import styled from 'styled-components';
import { boxStyledProps, BoxProps } from './Box';

export type FlexProps = BoxProps;

/**
 * Responsive Flexbox container, based on the `Box` component but has `display: flex` by default.
 */
export const Flex = styled.div<FlexProps>(boxStyledProps);

Flex.defaultProps = {
	display: 'flex',
};

export default Flex;
