import React from 'react';
import styled from '@emotion/styled';
import { space, textAlign, variant } from 'styled-system';
import { TextAlignProperty } from 'csstype';
import { BaseProps, SpaceProps } from '../types';

type Level = 1 | 2 | 3 | 4 | 5 | 6;

interface Props extends BaseProps, SpaceProps {
	level?: Level | Level[];
	textAlign?: TextAlignProperty | TextAlignProperty[];
}

const HeadingBase: React.FunctionComponent<Props> = ({
	level,
	as: Component = `h${level}`,
	...props
}) => <Component {...props} />;

const Heading: React.FunctionComponent<Props> = styled(HeadingBase)<{}>(
	space,
	textAlign,
	variant({
		scale: 'headingStyles',
		prop: 'level',
	})
);

Heading.defaultProps = {
	level: 1,
};

/** @component */
export default Heading;
