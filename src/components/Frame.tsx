import { Box, type BoxProps } from './Box';

type FrameProps = Omit<BoxProps<'div'>, 'css'> & {
	/** Aspect ratio (e.g. `9/6`) */
	aspectRatio: string;
};

/**
 * Container that keeps the given aspect ratio. Most useful for images. Images are cropped by default (`object-fit: cover`) and other content is centered.
 */
export function Frame({ children, aspectRatio, ...props }: FrameProps) {
	return (
		<Box
			{...props}
			css={{
				aspectRatio,
				'& > :is(img, video)': {
					width: '100%',
					height: '100%',
					objectFit: 'cover',
				},
			}}
		>
			{children}
		</Box>
	);
}
