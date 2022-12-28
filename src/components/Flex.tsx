import styled from 'styled-components';
import { boxStyledProps, PROPS_TO_IGNORE, BoxProps } from './Box';

export type FlexProps = BoxProps;

/**
 * Responsive Flexbox container, based on the `Box` component but has `display: flex` by default.
 */
export const Flex = styled.div.withConfig({
	shouldForwardProp: (prop, defaultValidatorFn) =>
		PROPS_TO_IGNORE.includes(prop) === false && defaultValidatorFn(prop),
})<FlexProps>(boxStyledProps);

Flex.defaultProps = {
	display: 'flex',
};

export default Flex;
