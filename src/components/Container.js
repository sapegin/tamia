import styled from 'react-emotion';
import themeGet from '../util/themeGet';

/**
 * Content container with max width (`theme.page.contentMaxWidth`).
 */
const Container = styled('div')`
	max-width: ${themeGet('page.contentMaxWidth')};
	margin: 0 auto;
`;

/** @component */
export default Container;
