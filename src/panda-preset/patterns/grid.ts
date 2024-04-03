import type { PatternConfig } from '@pandacss/dev';

/**
 * Generic CSS Grid layout component. Based on the `box` but with `display: grid` by default.
 */
export const grid: PatternConfig = {
	properties: {
		/** Magic auto layout */
		auto: { type: 'enum', value: ['narrow', 'wide'] },
	},
	transform(props) {
		const { auto, ...rest } = props;
		const autoWidth: Record<string, string> = {
			narrow: '200px',
			wide: '300px',
		};
		return {
			display: 'grid',
			gridTemplateColumns:
				typeof auto === 'string' && auto in autoWidth
					? `repeat(auto-fit, minmax(${autoWidth[auto]},1fr))`
					: undefined,
			...rest,
		};
	},
};
