import { Stack, type StackProps } from './Stack';
import { Box, type BoxProps } from './Box';

export function OrderedList(props: StackProps<'ol'>) {
	return <Stack as="ol" gap="xs" ml="0.35rem" {...props} />;
}

export function OrderedListItem({
	pause,
	...props
}: Omit<BoxProps<'li'>, 'css'> & { pause: boolean }) {
	return (
		<Box
			as="li"
			{...props}
			css={{
				listStyle: 'none',
				counterIncrement: 'steps-counter',
				padding: '0 0 0 1.1rem',
				marginBottom: 'm',
				_before: {
					content: `counter(steps-counter)`,
				},
			}}
		/>
	);
}
