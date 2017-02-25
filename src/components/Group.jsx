export default function Group({
	separator = ' ',
	inline = false,
	component = inline ? 'span' : 'div',
	children,
	...rest
}) {
	const items = [];
	children = children.filter(child => !!child);
	children.forEach((item, index) => {
		items.push(item);
		if (index < children.length - 1) {
			items.push(separator);
		}
	});
	const Tag = component;
	return <Tag {...rest}>{items}</Tag>;
}
