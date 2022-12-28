import styled from 'styled-components';
import { boxStyledProps, PROPS_TO_IGNORE, BoxProps } from './Box';

export type StackProps = BoxProps & {
	/** Direction: horizontal (`row`) or vertical (`column`) */
	direction?: BoxProps['flexDirection'];
};

const ALL_PROPS_TO_IGNORE = [...PROPS_TO_IGNORE, 'direction'];

/**
 * Stacking layout: horizontal, vertical, and responsive. Adds equal amount
 * of spacing between children.
 */
export const Stack = styled.div
	.withConfig({
		shouldForwardProp: (prop, defaultValidatorFn) =>
			ALL_PROPS_TO_IGNORE.includes(prop) === false && defaultValidatorFn(prop),
	})
	.attrs<StackProps>((props) => ({
		flexDirection: props.direction || 'column',
	}))<StackProps>(boxStyledProps);

Stack.defaultProps = {
	display: 'flex',
};

export default Stack;
