/* eslint-disable @typescript-eslint/no-unused-vars */

import { ReactNode } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { getCss, PrimitiveProps, CSSProps } from '../primitives';

export type BoxProps = PrimitiveProps<DefaultTheme> & {
	children: ReactNode;
	css?: CSSProps;
};

/**
 * Generic container with responsive props to control whitespace, layout,
 * positioning and colors.
 */
export const Box = styled.div<BoxProps>(
	// @ts-expect-error HACK: Filter out common props from rendering as styles
	({ children, as, src, variant, theme, css, ...props }) => {
		return getCss({ ...props, ...css }, theme);
	}
);

Box.defaultProps = {
	boxSizing: 'border-box',
	minWidth: 0,
};

export default Box;
