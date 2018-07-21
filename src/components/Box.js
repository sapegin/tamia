import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Base from './Base';

const SIZES = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'];

const size = value => props => props.theme.space[props[value]];

const Box = styled(Base)`
	margin: ${size('m')};
	margin-top: ${size('mt')};
	margin-right: ${size('mr')};
	margin-bottom: ${size('mb')};
	margin-left: ${size('ml')};
	padding: ${size('p')};
	padding-top: ${size('pt')};
	padding-right: ${size('pr')};
	padding-bottom: ${size('pb')};
	padding-left: ${size('pl')};
`;
Box.defaultProps = {
	is: 'div',
};

Box.propTypes = {
	m: PropTypes.oneOf(SIZES),
	mt: PropTypes.oneOf(SIZES),
	mr: PropTypes.oneOf(SIZES),
	mb: PropTypes.oneOf(SIZES),
	ml: PropTypes.oneOf(SIZES),
	p: PropTypes.oneOf(SIZES),
	pt: PropTypes.oneOf(SIZES),
	pr: PropTypes.oneOf(SIZES),
	pb: PropTypes.oneOf(SIZES),
	pl: PropTypes.oneOf(SIZES),
	is: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
	children: PropTypes.node,
};

/** @component */
export default Box;
