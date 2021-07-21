import styled from 'styled-components';

/**
 * A container with `theme.page.textMaxWidth` max width.
 */
export const TextContainer = styled.div`
	max-width: ${(p) => p.theme.page.textMaxWidth};
`;

/** @component */
export default TextContainer;
