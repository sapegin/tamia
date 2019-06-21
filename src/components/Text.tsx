import styled from 'styled-components';
import {
	space,
	textAlign,
	variant,
	SpaceProps,
	TextAlignProps,
	ResponsiveValue,
} from 'styled-system';

type Props = SpaceProps &
	TextAlignProps & {
		variant?: ResponsiveValue<string>;
	};

const Text = styled('p')<Props>(
	space,
	textAlign,
	variant({
		scale: 'textStyles',
		prop: 'variant',
	})
);

Text.defaultProps = {
	variant: 'base',
};

/** @component */
export default Text;
