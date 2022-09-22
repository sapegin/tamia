import styled from 'styled-components';
import { system, ResponsiveValue, TLengthStyledSystem } from 'styled-system';
import Box, { BoxProps } from './Box';

export type FlexProps = BoxProps & {
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
	system({
		gap: {
			property: 'gap',
			scale: 'space',
		},
		'column-gap': {
			property: 'columnGap',
			scale: 'space',
		},
		'row-gap': {
			property: 'rowGap',
			scale: 'space',
		},
	})
);

Flex.defaultProps = {
	display: 'flex',
};

export default Flex;
