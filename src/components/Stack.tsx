import styled from 'styled-components';
import { system } from 'styled-system';
import Flex, { FlexProps } from './Flex';

type Props = FlexProps & {
	/** Direction: horizontal (`row`) or vertical (`column`) */
	direction?: FlexProps['flexDirection'];
};

/**
 * Stacking layout: horizontal, vertical, and responsive. Adds equal amount
 * of spacing between children.
 */
export const Stack = styled(Flex)<Props>(
	{
		display: 'flex',
	},
	system({
		direction: {
			property: 'flexDirection',
		},
	})
);

Stack.defaultProps = {
	direction: 'column',
};

/** @component */
export default Stack;
