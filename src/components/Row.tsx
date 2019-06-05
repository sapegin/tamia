import styled from '@emotion/styled';
import { Theme } from '../types';

interface Props {
	narrow?: boolean;
	alignItems?: string;
	alignContent?: string;
	justifyContent?: string;
}

interface PropsWithTheme extends Props {
	theme: Theme;
}

const space = (props: PropsWithTheme) =>
	props.narrow ? props.theme.space.s : props.theme.space.m;

const Row = styled('div')<Props>`
	margin-left: -${space};
	margin-right: -${space};
	display: flex;
	flex-flow: row wrap;
	align-items: ${props => props.alignItems};
	align-content: ${props => props.alignContent};
	justify-content: ${props => props.justifyContent};
	& > * {
		padding-left: ${space};
		padding-right: ${space};
	}
`;

/** @component */
export default Row;
