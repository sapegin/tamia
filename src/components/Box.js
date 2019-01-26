import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Base from './Base';

const SIZES = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'];

const size = (prop, fallback) => props =>
	props.theme.space[props[prop]] || props.theme.space[props[fallback]];

const Box = styled(Base)`
	margin: ${size('m')};
	margin-top: ${size('mt', 'my')};
	margin-right: ${size('mr', 'mx')};
	margin-bottom: ${size('mb', 'my')};
	margin-left: ${size('ml', 'mx')};
	padding: ${size('p')};
	padding-top: ${size('pt', 'py')};
	padding-right: ${size('pr', 'px')};
	padding-bottom: ${size('pb', 'py')};
	padding-left: ${size('pl', 'px')};
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
	as: PropTypes.any,
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
