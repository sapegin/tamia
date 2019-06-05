import React from 'react';

interface Props {
	as?: React.FunctionComponent<any> | React.ComponentClass<any> | string;
}

const Html: React.FunctionComponent<Props> = ({
	children,
	as: Component = 'div',
	...props
}) => (
	<Component
		dangerouslySetInnerHTML={{
			__html: children,
		}}
		{...props}
	/>
);

export default Html;
