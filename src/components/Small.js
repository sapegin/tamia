import styled from 'styled-components';
import Base from './Base';

const Small = styled(Base)`
	font-size: ${props => props.theme.fontSizes.s};
`;
Small.defaultProps = {
	is: 'small',
};

export default Small;
