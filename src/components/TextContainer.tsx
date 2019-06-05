import styled from '@emotion/styled';
import themeGet from '../util/themeGet';

const TextContainer = styled('div')`
	max-width: ${themeGet('page.textMaxWidth')};
`;

/** @component */
export default TextContainer;
