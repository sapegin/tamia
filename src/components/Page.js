import styled from 'react-emotion';
import themeGet from '../util/themeGet';

const Page = styled('div')`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	padding: ${themeGet('page.yPadding')} 0;
`;

const Footer = styled('footer')`
	margin-top: auto;
	margin-bottom: -${themeGet('page.yPadding')};
	padding-bottom: ${themeGet('space.s')};
`;

Page.Footer = Footer;

/**
 * A page container to create a sticky footer.
 * @component
 */
export default Page;
