import styled from '@emotion/styled';
import themeGet from '../util/themeGet';

/**
 * Content container with max width (`theme.page.contentMaxWidth`).
 */
const Container = styled('div')`
	max-width: ${themeGet('page.contentMaxWidth')};
	margin-left: auto;
	margin-right: auto;
`;

/** @component */
export default Container;
