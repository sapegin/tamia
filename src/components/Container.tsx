import styled from 'styled-components';

/**
 * Content container with max width (`theme.page.contentMaxWidth`).
 */
const Container = styled.div`
	max-width: ${p => p.theme.page.contentMaxWidth};
	margin-left: auto;
	margin-right: auto;
`;

/** @component */
export default Container;
