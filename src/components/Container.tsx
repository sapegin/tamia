import styled from 'styled-components';

/**
 * Content container with max width (`theme.page.contentMaxWidth`).
 */
export const Container = styled.div`
	max-width: ${p => p.theme.page.contentMaxWidth};
	margin-left: auto;
	margin-right: auto;
	padding: ${p => p.theme.page.contentPaddingY}
		${p => p.theme.page.contentPaddingX};
`;

export default Container;
