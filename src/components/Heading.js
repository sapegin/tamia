import styled from 'styled-components';
import Base from './Base';

const SIZES = ['', 'xxl', 'xl', 'l', 'm', 's', 'xs'];

const Heading = styled(Base).attrs({
	is: props => props.is || `h${props.size}`,
})`
	margin-top: ${props => props.theme.space[props.mt] || 0};
	margin-bottom: ${props => props.theme.space[props.mb] || 0};
	font-size: ${props => props.theme.fontSizes[SIZES[props.size]]};
	line-height: ${props => props.theme.lineHeights.heading};
	font-weight: ${props => props.theme.fontWeights.heading};
`;
Heading.defaultProps = {
	size: 1,
};

export default Heading;
