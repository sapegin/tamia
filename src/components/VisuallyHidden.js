import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { hideVisually } from 'polished';
import Base from './Base';

/**
 * Hide content visually but keep it accessible to screen readers.
 */
const VisuallyHidden = styled(Base)`
	${hideVisually()};
`;

VisuallyHidden.propTypes = {
	is: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	/** @ignore */
	blacklist: PropTypes.array,
};

VisuallyHidden.defaultProps = {
	is: 'p',
	blacklist: Object.keys(VisuallyHidden.propTypes),
};

/** @component */
export default VisuallyHidden;
