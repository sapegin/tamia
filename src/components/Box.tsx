import styled from '@emotion/styled';
import { Size } from '../types';

interface Props {
	m?: Size;
	mt?: Size;
	mr?: Size;
	mb?: Size;
	ml?: Size;
	mx?: Size;
	my?: Size;
	p?: Size;
	pt?: Size;
	pr?: Size;
	pb?: Size;
	pl?: Size;
	px?: Size;
	py?: Size;
	position?: 'absolute' | 'relative' | 'static' | 'fixed' | 'sticky';
}

interface PropsWithTheme {
	[key: string]: any;
}

const size = (prop: string, fallback?: string) => (
	props: PropsWithTheme
): string =>
	props.theme.space[props[prop]] || props.theme.space[props[fallback || '']];

const Box = styled('div')<Props>`
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
	position: ${props => props.position};
`;

/** @component */
export default Box;
