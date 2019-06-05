import styled from '@emotion/styled';
import { Size, Theme } from '../types';

const BREAKPOINTS: { [key: string]: number } = {
	default: 0,
	small: 1,
	medium: 2,
	large: 3,
	huge: 4,
};
const BREAKPOINT_NAMES = Object.keys(BREAKPOINTS);

const WIDTHS = [
	1 / 6,
	5 / 6,
	1 / 4,
	3 / 3,
	1 / 3,
	2 / 3,
	1 / 2,
	1,
	'auto',
] as const;

type Direction = 'left' | 'right';

type Breakpoint = keyof typeof BREAKPOINTS;

type Width = typeof WIDTHS[number];

interface Props {
	/** Array of 1/6, 5/6, 1/4, 3/3, 1/3, 2/3, 1/2, 1, auto */
	width: Width[];
	p?: Size;
	pt?: Size;
	pb?: Size;
	py?: Size;
	align?: 'left' | 'center' | 'right';
	push?: Direction;
	order?: number;
}

interface PropsWithTheme extends Props {
	theme: Theme;
}

const push = (direction: Direction) => (props: Props) =>
	props.push === direction && 'auto';

const size = (breakpoint: Breakpoint) => (props: Props) => {
	const width = props.width[BREAKPOINTS[breakpoint]];
	if (width === 'auto') {
		return width;
	}
	return width && `${width * 100}%`;
};

const widthStyle = (props: Props, breakpoint: Breakpoint) => {
	const width = size(breakpoint)(props);
	if (!width) {
		return null;
	}
	return `width: ${width};`;
};

const column = (props: PropsWithTheme) => (breakpoint: Breakpoint) => {
	const styles = [widthStyle(props, breakpoint)].filter(Boolean).join('');

	const minWidth = props.theme.breakpoints[breakpoint];
	if (!minWidth) {
		return styles;
	}

	return `
		@media (min-width: ${minWidth}) {
			${styles};
		}
	`;
};

const padding = (prop: string, fallback?: string) => (props: {
	[key: string]: any;
}) =>
	props.theme.space[props[prop]] || props.theme.space[props[fallback || '']];

const Column = styled('div')<Props>`
	margin-left: ${push('right')};
	margin-right: ${push('left')};
	padding: ${padding('p')};
	padding-top: ${padding('pt', 'py')};
	padding-bottom: ${padding('pb', 'py')};
	text-align: ${props => props.align};
	order: ${props => props.order};
	${props => BREAKPOINT_NAMES.map(column(props))};
`;

Column.defaultProps = {
	width: [],
};

/** @component */
export default Column;
