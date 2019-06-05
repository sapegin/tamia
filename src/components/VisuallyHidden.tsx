import styled from '@emotion/styled';
import { hideVisually } from 'polished';

/**
 * Hide content visually but keep it accessible to screen readers.
 */
const VisuallyHidden = styled('p')`
	${hideVisually()};
`;

/** @component */
export default VisuallyHidden;
