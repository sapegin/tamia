import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Base from './Base';

const SIZES = ['xxl', 'xl', 'l', 'm', 's', 'xs'];

const Text = styled(Base)`
	margin-top: ${props => props.theme.space[props.mt]};
	margin-bottom: ${props => props.theme.space[props.mb]};
	font-size: ${props => props.theme.fontSizes[props.size]};
	color: ${props => props.theme.colors[props.color]};
`;

Text.propTypes = {
	size: PropTypes.oneOf(SIZES),
	color: PropTypes.string,
	is: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	mt: PropTypes.oneOf(SIZES),
	mb: PropTypes.oneOf(SIZES),
};

Text.defaultProps = {
	size: 'm',
	is: 'p',
	blacklist: Object.keys(Text.propTypes),
};

/** @component */
export default Text;
