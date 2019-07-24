import React from 'react';
import { AsProps } from '../types';

type Props = AsProps & {
	children: React.ReactNode;
};

const Html = ({ children, as: Component = 'div', ...props }: Props) => (
	<Component
		dangerouslySetInnerHTML={{
			__html: children,
		}}
		{...props}
	/>
);

export default Html;
