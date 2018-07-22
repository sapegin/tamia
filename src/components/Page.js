import PropTypes from 'prop-types';
import styled from 'react-emotion';
import themeGet from '../util/themeGet';
import Base from './Base';

const Page = styled(Base)`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	padding-top: ${themeGet('page.yPadding')};
	padding-top: ${themeGet('page.yPadding')};
`;

Page.propTypes = {
	is: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Page.defaultProps = {
	is: 'div',
};

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
