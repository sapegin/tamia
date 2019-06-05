import React from 'react';
import styled from '@emotion/styled';
import { Size } from '../types';

const SIZES = ['', 'xxl', 'xl', 'l', 'm', 's', 'xs'];

interface Props {
	level: 1 | 2 | 3 | 4 | 5 | 6;
	mt?: Size;
	mb?: Size;
	as?: React.FunctionComponent<any> | React.ComponentClass<any> | string;
}

const HeadingBase: React.FunctionComponent<Props> = ({
	level,
	as: Component = `h${level}`,
	...props
}) => <Component {...props} />;

const Heading = styled(HeadingBase)<Props>`
	margin-top: ${props => (props.mt ? props.theme.space[props.mt] : 0)};
	margin-bottom: ${props => (props.mb ? props.theme.space[props.mb] : 0)};
	font-size: ${props => props.theme.fontSizes[SIZES[props.level]]};
	line-height: ${props => props.theme.lineHeights.heading};
	font-weight: ${props => props.theme.fontWeights.heading};
`;

Heading.defaultProps = {
	level: 1,
};

/** @component */
export default Heading;
