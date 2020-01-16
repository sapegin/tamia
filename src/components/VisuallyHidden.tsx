import styled from 'styled-components';

/**
 * Hide content visually but keep it accessible to screen readers.
 */
export const VisuallyHidden = styled.p({
	border: '0',
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: '1px',
	margin: '-1px',
	overflow: 'hidden',
	padding: '0',
	position: 'absolute',
	whiteSpace: 'nowrap',
	width: '1px',
});

/** @component */
export default VisuallyHidden;
