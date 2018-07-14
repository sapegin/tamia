import PropTypes from 'prop-types';
import styled from 'styled-components';
import Base from './Base';
import { space } from './Column';

const Row = styled(Base)`
	margin-left: -${space};
	margin-right: -${space};
	display: flex;
	flex-flow: row wrap;
`;

Row.propTypes = {
	is: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	children: PropTypes.node,
};

Row.defaultProps = {
	is: 'div',
};

export default Row;
