import styled from 'styled-components';
import Base from './Base';

const Big = styled(Base)`
	font-size: ${props => props.theme.fontSizes.l};
`;
Big.defaultProps = {
	is: 'big',
};

export default Big;
