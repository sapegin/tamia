import type { ImgHTMLAttributes } from 'react';
import { css } from '../../styled-system/css';
import { createBox, type BoxProps } from './Box';

/**
 * Responsive image.
 */
export function Image({
	width,
	height,
	...props
}: Omit<BoxProps<'img'>, 'width' | 'height' | 'className'> &
	Pick<ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'>) {
	return createBox(
		{
			...props,
			htmlWidth: width,
			htmlHeight: height,
			className: css({
				maxWidth: '100%',
				height: 'auto',
			}),
		},
		'img'
	);
}
