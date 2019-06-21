import styled from 'styled-components';
import themeGet from '../util/themeGet';

const Page = styled('div')`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	padding: ${themeGet('page.yPadding')} 0;
`;

const PageFooter = styled('footer')`
	margin-top: auto;
`;

/**
 * A page container to create a sticky footer.
 * @component
 */
export { Page, PageFooter };
