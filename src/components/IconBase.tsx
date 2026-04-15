import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface IconBaseProps extends Omit<
	ComponentPropsWithoutRef<'svg'>,
	'viewBox' | 'fill' | 'width' | 'height'
> {
	// TODO: Remove in favor of Tailwind size-* classes
	width?: string | number;
	height?: string | number;
	viewBox: { width: number; height: number };
	fill?: string;
	children?: ReactNode;
}

/**
 * Base for SVG icons.
 *
 * @example
 * <IconBase viewBox={{ width: 128, height: 128 }} width={24} height={24}>
 *   <path d="..." />
 * </IconBase>
 */
export function IconBase({
	viewBox,
	fill = 'currentColor',
	children,
	className,
	...props
}: IconBaseProps) {
	return (
		<svg
			{...props}
			className={clsx('inline-block align-middle', className)}
			viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
			fill={fill}
			preserveAspectRatio="xMidYMid meet"
			aria-hidden="true"
		>
			{children}
		</svg>
	);
}
