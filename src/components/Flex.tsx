import styled from '@emotion/styled';
import Box from './Box';
import {
	BaseProps,
	SpaceProps,
	ColorProps,
	LayoutProps,
	FlexboxProps,
} from '../types';

interface Props
	extends BaseProps,
		SpaceProps,
		ColorProps,
		LayoutProps,
		FlexboxProps {}

const Flex: React.FunctionComponent<Props> = styled(Box)<{}>({
	display: 'flex',
});

/** @component */
export default Flex;
