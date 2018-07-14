import styled from 'styled-components';

/**
 * Content container with max width (`theme.page.contentMaxWidth`).
 */
const Container = styled.div`
	max-width: ${theme => theme.page.contentMaxWidth};
	margin: 0 auto;
`;

/** @component */
export default Container;
