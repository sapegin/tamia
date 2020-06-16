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
import Box from './Box';

type Props = SpaceProps &
	LayoutProps &
	FlexboxProps &
	ColorProps &
	BorderProps &
	ShadowProps &
	PositionProps & {
		/** Spacing between items */
		gap?: ResponsiveValue<TLengthStyledSystem>;
	};

export const Stack = styled(Box)<Props>(
	// We are using the “lobotomized owl” CSS selector to add margins between children
	// More information: https://every-layout.dev/layouts/stack/#the-solution
	system({
		gap: {
			// Here, instead of a CSS property we generate a selector
			// @ts-ignore
			property: '&& > * + *',
			scale: 'space',
			// And here instead of the value for the property we return an object
			// We need to add important since we set margin: 0 in our components
			// and we need to override it
			transform: (value, scale) => ({
				marginTop: (scale as TLengthStyledSystem[])[value],
			}),
		},
	})
);

/** @component */
export default Stack;
