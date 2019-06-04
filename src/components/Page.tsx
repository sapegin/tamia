import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import themeGet from '../util/themeGet';
import Base from './Base';

const Page = styled(Base)`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	padding: ${themeGet('page.yPadding')} 0;
`;

Page.propTypes = {
	as: PropTypes.any,
	/** @ignore */
	blacklist: PropTypes.array,
};

Page.defaultProps = {
	as: 'div',
};

const Footer = styled(Base)`
	margin-top: auto;
`;

Footer.propTypes = {
	as: PropTypes.any,
	/** @ignore */
	blacklist: PropTypes.array,
};

Footer.defaultProps = {
	as: 'footer',
};

Page.Footer = Footer;

/**
 * A page container to create a sticky footer.
 * @component
 */
export default Page;
