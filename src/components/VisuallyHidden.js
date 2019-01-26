import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { hideVisually } from 'polished';
import Base from './Base';

/**
 * Hide content visually but keep it accessible to screen readers.
 */
const VisuallyHidden = styled(Base)`
	${hideVisually()};
`;

VisuallyHidden.propTypes = {
	as: PropTypes.any,
	/** @ignore */
	blacklist: PropTypes.array,
};

VisuallyHidden.defaultProps = {
	as: 'p',
	blacklist: Object.keys(VisuallyHidden.propTypes),
};

/** @component */
export default VisuallyHidden;
