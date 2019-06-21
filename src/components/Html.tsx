import React from 'react';

interface Props {
	as?: React.FunctionComponent<any> | React.ComponentClass<any> | string;
	children: React.ReactNode;
}

const Html = ({ children, as: Component = 'div', ...props }: Props) => (
	<Component
		dangerouslySetInnerHTML={{
			__html: children,
		}}
		{...props}
	/>
);

export default Html;
