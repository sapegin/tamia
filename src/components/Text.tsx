import styled from '@emotion/styled';
import { space, color, typography, variant } from 'styled-system';
import { BaseProps, SpaceProps, ColorProps, TypographyProps } from '../types';

// TODO: Remove low lever props and keep only variant?

interface Props extends BaseProps, SpaceProps, ColorProps, TypographyProps {
	variant?: string | string[];
}

const Text: React.FunctionComponent<Props> = styled('p')<{}>(
	space,
	color,
	typography,
	variant({
		scale: 'textStyles',
		prop: 'variant',
	})
);

Text.defaultProps = {
	color: 'base',
	fontFamily: 'base',
	fontSize: 'm',
	fontWeight: 'base',
};

/** @component */
export default Text;
