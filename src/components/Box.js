import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Base from './Base';

const SIZES = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'];

const size = value => props => props.theme.space[props[value]];

const Box = styled(Base)`
	margin: ${size('m')};
	margin-top: ${size('mt') || size('my')};
	margin-right: ${size('mr') || size('mx')};
	margin-bottom: ${size('mb') || size('my')};
	margin-left: ${size('ml') || size('mx')};
	padding: ${size('p')};
	padding-top: ${size('pt') || size('py')};
	padding-right: ${size('pr') || size('px')};
	padding-bottom: ${size('pb') || size('py')};
	padding-left: ${size('pl') || size('px')};
`;

Box.propTypes = {
	m: PropTypes.oneOf(SIZES),
	mt: PropTypes.oneOf(SIZES),
	mr: PropTypes.oneOf(SIZES),
	mb: PropTypes.oneOf(SIZES),
	ml: PropTypes.oneOf(SIZES),
	mx: PropTypes.oneOf(SIZES),
	my: PropTypes.oneOf(SIZES),
	p: PropTypes.oneOf(SIZES),
	pt: PropTypes.oneOf(SIZES),
	pr: PropTypes.oneOf(SIZES),
	pb: PropTypes.oneOf(SIZES),
	pl: PropTypes.oneOf(SIZES),
	px: PropTypes.oneOf(SIZES),
	py: PropTypes.oneOf(SIZES),
	as: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
	children: PropTypes.node,
	/** @ignore */
	blacklist: PropTypes.array,
};

Box.defaultProps = {
	as: 'div',
	blacklist: Object.keys(Box.propTypes),
};

/** @component */
export default Box;
