import React, { ComponentProps } from 'react';
import styled from 'styled-components';
import Box from './Box';

// Based on https://every-layout.dev/layouts/frame/

type FrameProps = ComponentProps<typeof Box> & {
	/** Aspect ratio (e.g. `6/9`) */
	ratio: number;
};

const Inner = styled.div`
	overflow: hidden;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;

	& > img,
	& > video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

/**
 * Container that keeps the given aspect ratio. Most useful for images. Images are cropped by default (`object-fit: cover`) and other content is centered.
 */
export default function Frame({ children, ratio, ...props }: FrameProps) {
	return (
		<Box {...props} position="relative" sx={{ pb: `${ratio * 100}%` }}>
			<Inner>{children}</Inner>
		</Box>
	);
}
