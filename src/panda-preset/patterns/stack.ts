import type { PatternConfig } from '@pandacss/dev';

/**
 * Stacking layout: horizontal, vertical, and responsive. Adds equal amount
 * of spacing between children.
 */
export const stack: PatternConfig = {
	properties: {
		/** Stacking direction */
		direction: { type: 'property', value: 'flexDirection' },
	},
	defaultValues: {
		direction: 'column',
	},
	transform(props) {
		const { direction, ...rest } = props;
		return {
			display: 'flex',
			flexDirection: direction,
			...rest,
		};
	},
};
