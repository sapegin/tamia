import { Stack, type StackProps } from './Stack';
import { Text, type TextProps } from './Text';

export function List(props: Omit<StackProps<'ol'>, 'as' | 'css'>) {
	return <Stack gap="m" {...props} as="ol" css={{ listStyle: 'none' }} />;
}

export function ListItem(props: Omit<TextProps<'li'>, 'as'>) {
	return <Text {...props} as="li" />;
}
