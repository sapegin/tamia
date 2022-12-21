import styled from 'styled-components';
import { boxStyledProps, BoxProps } from './Box';

export type StackProps = BoxProps & {
	/** Direction: horizontal (`row`) or vertical (`column`) */
	direction?: BoxProps['flexDirection'];
};

/**
 * Stacking layout: horizontal, vertical, and responsive. Adds equal amount
 * of spacing between children.
 */
export const Stack = styled.div.attrs<StackProps>((props) => ({
	flexDirection: props.direction || 'column',
}))<StackProps>(boxStyledProps);

Stack.defaultProps = {
	display: 'flex',
};

export default Stack;
