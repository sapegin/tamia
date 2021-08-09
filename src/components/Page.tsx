import React from 'react';
import styled from 'styled-components';

const PageStyled = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

const FooterStyled = styled.footer`
	margin-top: auto;
	padding-top: ${(p) => p.theme.page.contentPaddingY};
`;

/**
 * Page container with a sticky footer.
 */
export default class Page extends React.Component<
	React.ComponentProps<typeof PageStyled>
> {
	public static Footer = FooterStyled;
	public render() {
		return <PageStyled {...this.props} />;
	}
}
