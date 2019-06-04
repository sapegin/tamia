import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import themeGet from '../util/themeGet';
import Base from './Base';

/**
 * Text container with max width (`theme.page.textMaxWidth`) to avoid too wide
 * text columns.
 */
const TextContainer = styled(Base)`
	max-width: ${themeGet('page.textMaxWidth')};
`;

TextContainer.propTypes = {
	as: PropTypes.any,
};

TextContainer.defaultProps = {
	as: 'div',
};

/** @component */
export default TextContainer;
