import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import themeGet from '../util/themeGet';
import Base from './Base';

/**
 * Content container with max width (`theme.page.contentMaxWidth`).
 */
const Container = styled(Base)`
	max-width: ${themeGet('page.contentMaxWidth')};
	margin-left: auto;
	margin-right: auto;
`;

Container.propTypes = {
	as: PropTypes.any,
};

Container.defaultProps = {
	as: 'div',
};

/** @component */
export default Container;
