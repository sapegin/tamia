import styled from 'styled-components';

const Page = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

const Footer = styled.footer`
	margin-top: auto;
`;

Page.Footer = Footer;

/**
 * A page container to create a sticky footer.
 * @component
 */
export default Page;
