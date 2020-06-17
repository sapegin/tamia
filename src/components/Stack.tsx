import styled from 'styled-components';
import {
	system,
	SpaceProps,
	ColorProps,
	LayoutProps,
	FlexboxProps,
	ResponsiveValue,
	TLengthStyledSystem,
	BorderProps,
	ShadowProps,
	PositionProps,
} from 'styled-system';
import Flex from './Flex';

type Direction = 'column' | 'row';

type Props = SpaceProps &
	LayoutProps &
	FlexboxProps &
	ColorProps &
	BorderProps &
	ShadowProps &
	PositionProps & {
		/** Spacing between items */
		gap?: ResponsiveValue<TLengthStyledSystem>;
		/** Direction: horizontal (`row`) or vertical (`column`) */
		direction?: ResponsiveValue<Direction>;
	};

export const Stack = styled(Flex)<Props>(
	// We are using the “lobotomized owl” CSS selector to add margins between children
	// More information: https://every-layout.dev/layouts/stack/#the-solution
	system({
		gap: {
			// Set the gap value to a CSS property to later use it to add margin
			// at the correct side. We have to use CSS properties becase it's the
			// only way to use several responsive props together
			// @ts-ignore
			property: '--stack-gap',
			scale: 'space',
		},
		direction: {
			// @ts-ignore
			property: '&&',
			transform: value => ({
				flexDirection: value,
				// Use lobotomized owl selector to add margin on top or left
				// depending on the direction, use value from the CSS property
				'> * + *': {
					marginTop: value === 'column' ? 'var(--stack-gap)' : 0,
					marginLeft: value === 'row' ? 'var(--stack-gap)' : 0,
				},
			}),
		},
	})
);

Stack.defaultProps = {
	direction: 'column',
};

/** @component */
export default Stack;
