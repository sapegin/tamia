import PropTypes from 'prop-types';
import styled from 'react-emotion';
import themeGet from '../util/themeGet';
import Base from './Base';

const Page = styled(Base)`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	padding: ${themeGet('page.yPadding')} 0;
`;

Page.propTypes = {
	is: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Page.defaultProps = {
	is: 'div',
};

const Footer = styled(Base)`
	margin-top: auto;
	margin-bottom: -${themeGet('page.yPadding')};
	padding-bottom: ${themeGet('space.s')};
`;

Footer.propTypes = {
	is: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Footer.defaultProps = {
	is: 'footer',
};

Page.Footer = Footer;

/**
 * A page container to create a sticky footer.
 * @component
 */
export default Page;
