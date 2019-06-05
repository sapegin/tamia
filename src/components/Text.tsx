import styled from '@emotion/styled';
import { Size, FontSize } from '../types';

interface Props {
	size?: FontSize;
	color?: string;
	fontStyle?: 'italic';
	fontWeight?: string;
	mt?: Size;
	mb?: Size;
}

const Text = styled('p')<Props>`
	margin-top: ${props => props.mt && props.theme.space[props.mt]};
	margin-bottom: ${props => props.mb && props.theme.space[props.mb]};
	font-size: ${props => props.size && props.theme.fontSizes[props.size]};
	font-weight: ${props =>
		props.fontStyle && props.theme.fontWeights[props.fontStyle]};
	font-style: ${props => props.fontStyle};
	color: ${props => props.color && props.theme.colors[props.color]};
`;

Text.defaultProps = {
	size: 'm',
	fontWeight: 'base',
};

/** @component */
export default Text;
