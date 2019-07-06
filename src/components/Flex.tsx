import styled from 'styled-components';
import Box from './Box';
import {
	SpaceProps,
	ColorProps,
	LayoutProps,
	FlexboxProps,
} from 'styled-system';

type Props = SpaceProps & ColorProps & LayoutProps & FlexboxProps;

export const Flex = styled(Box)<Props>({});

Flex.defaultProps = {
	display: 'flex',
	justifyContent: 'center',
	flexDirection: 'row',
};

/** @component */
export default Flex;
