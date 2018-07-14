import PropTypes from 'prop-types';
import styled from 'styled-components';
import themeGet from '../styles/themeGet';

const QuotedLink = styled.a`
	color: inherit;
	text-decoration: none;
	& u,
	&:link u,
	&:visited u {
		text-decoration: underline;
		color: ${themeGet('colors.primary')};
	}
	&:hover u,
	&:active u,
	&:focus u {
		color: ${themeGet('colors.hover')};
	}
`;

QuotedLink.propTypes = {
	children: PropTypes.node,
};

export default QuotedLink;
