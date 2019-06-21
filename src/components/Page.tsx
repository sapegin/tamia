import styled from 'styled-components';

const Page = styled('div')`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	padding: ${p => p.theme.page.yPadding} 0;
`;

const PageFooter = styled('footer')`
	margin-top: auto;
`;

/**
 * A page container to create a sticky footer.
 * @component
 */
export { Page, PageFooter };
