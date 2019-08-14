import styled from 'styled-components';
import Box from './Box';
import {
	SpaceProps,
	ColorProps,
	LayoutProps,
	FlexboxProps,
} from 'styled-system';

type Props = SpaceProps & ColorProps & LayoutProps & FlexboxProps;

/**
 * Responsive Flexbox container, based on the `Box` component but has `display: flex` by default.
 */
export const Flex = styled(Box)<Props>({});

Flex.defaultProps = {
	display: 'flex',
};

export default Flex;
