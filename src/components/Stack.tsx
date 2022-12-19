import styled from 'styled-components';
import Flex, { FlexProps } from './Flex';

export type StackProps = FlexProps & {
	/** Direction: horizontal (`row`) or vertical (`column`) */
	direction?: FlexProps['flexDirection'];
};

/**
 * Stacking layout: horizontal, vertical, and responsive. Adds equal amount
 * of spacing between children.
 */
export const Stack = styled(Flex).attrs<StackProps>((props) => ({
	flexDirection: props.direction || 'column',
}))<StackProps>``;

export default Stack;
