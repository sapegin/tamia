import styled from 'styled-components';
import Box from './Box';
import {
	SpaceProps,
	ColorProps,
	LayoutProps,
	FlexboxProps,
} from 'styled-system';

type Props = SpaceProps & ColorProps & LayoutProps & FlexboxProps;

const Flex = styled(Box)<Props>({
	display: 'flex',
});

/** @component */
export default Flex;
