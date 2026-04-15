import { Children, Fragment, type ReactNode } from 'react';

interface GroupProps {
	/**
	 * Custom separator: a string, JSX element, or any React node (space by
	 * default)
	 */
	separator?: ReactNode;
	/**
	 * Items to render with separators between them
	 */
	children: ReactNode;
}

/**
 * Render a collection of items separated by a space or a custom separator.
 *
 * @example
 * <Group separator=", ">
 *   <a href="#">One</a>
 *   <a href="#">Two</a>
 *   <a href="#">Three</a>
 * </Group>
 */
export function Group({ separator = ' ', children }: GroupProps) {
	// An alternative would requite to change the API and accept an array instead
	// of children, which would make the component less convenient to use
	// eslint-disable-next-line @eslint-react/no-children-to-array
	const items = Children.toArray(children).filter(Boolean);

	if (items.length <= 1) {
		return items;
	}

	return items.reduce<ReactNode[]>((acc, item, index) => {
		if (index > 0) {
			// It's okay to use index as a key here -- the separators never change, so
			// they can stay where they are even when items are reordered
			// eslint-disable-next-line @eslint-react/no-array-index-key
			acc.push(<Fragment key={`separator-${index}`}>{separator}</Fragment>);
		}
		acc.push(item);
		return acc;
	}, []);
}
