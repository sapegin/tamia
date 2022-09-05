import styled from 'styled-components';
import { system, ResponsiveValue, TLengthStyledSystem } from 'styled-system';
import Box, { BoxProps } from './Box';

type FlexProps = BoxProps & {
	/** Gap between items */
	gap?: ResponsiveValue<TLengthStyledSystem>;
	/** Horizontal gap between items */
	'column-gap'?: ResponsiveValue<TLengthStyledSystem>;
	/** Vertical gap between items */
	'row-gap'?: ResponsiveValue<TLengthStyledSystem>;
};

/**
 * Responsive Flexbox container, based on the `Box` component but has `display: flex` by default.
 */
export const Flex = styled(Box)<FlexProps>(
	{
		display: 'flex',
	},
	system({
		gap: {
			property: 'gap',
			scale: 'space',
		},
		'column-gap': {
			// @ts-expect-error
			property: 'column-gap',
			scale: 'space',
		},
		'row-gap': {
			// @ts-expect-error
			property: 'row-gap',
			scale: 'space',
		},
	})
);

export default Flex;
