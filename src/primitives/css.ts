import { SCALES, ALIASES, MULTIPLES, SIZE_SCALES } from './props';
import { get } from './util/get';
import type { Theme, CSSProps } from './types';

export type Styles = { [key: string]: string | undefined | Styles };

function px(value: unknown) {
	if (value === undefined) {
		return undefined;
	}
	return typeof value === 'string' ? value : `${value}px`;
}

function getValue(key: string, value: string, theme: Theme) {
	if (key in SCALES) {
		const scaleName = SCALES[key];
		const scale = get(theme, scaleName) ?? {};

		// The only special case prop `width`
		// Widths of 0...1 are considered percents: 0.5 -> 50%
		if (
			key === 'width' &&
			typeof value === 'number' &&
			value > 0 &&
			value <= 1
		) {
			return `${value * 100}%`;
		}

		const returnValue = get<string>(scale, value) ?? value;
		return SIZE_SCALES.includes(scaleName)
			? px(returnValue)
			: String(returnValue);
	} else {
		return value;
	}
}

function getMediaQuery(width: string) {
	return `@media screen and (min-width: ${px(width)})`;
}

// WARNING: This function mutates the `styles` parameter!
function createStyles(
	styles: Styles,
	key: string,
	value: string,
	theme: Theme
) {
	if (key in MULTIPLES) {
		const keys = MULTIPLES[key];
		for (let j = 0; j < keys.length; j++) {
			styles[keys[j]] = getValue(keys[j], value, theme);
		}
	} else {
		styles[key] = getValue(key, value, theme);
	}
}

export function getCss(props: CSSProps, theme: Theme) {
	const values = Object.entries(props);
	const styles: Styles = {};

	for (let i = 0; i < values.length; i++) {
		const [rawKey, rawValue] = values[i];
		if (rawValue === undefined) {
			continue;
		}

		const key = rawKey in ALIASES ? ALIASES[rawKey] : rawKey;

		if (Array.isArray(rawValue)) {
			const breakpoints = [
				null,
				...(get<string[]>(theme, 'breakpoints') ?? []),
			];

			for (let j = 0; j < breakpoints.length; j++) {
				const value = rawValue[j];
				if (value === undefined) {
					continue;
				}

				const width = breakpoints[j];
				if (width) {
					const mediaStyles: Styles = {};
					createStyles(mediaStyles, key, value, theme);
					styles[getMediaQuery(width)] = mediaStyles;
				} else {
					createStyles(styles, key, value, theme);
				}
			}
			continue;
		}

		createStyles(styles, key, rawValue, theme);
	}

	return styles;
}

export const css =
	(args: CSSProps | ((theme: Theme) => CSSProps)) =>
	({ theme }: { theme: Theme }) => {
		return getCss(typeof args === 'function' ? args(theme) : args, theme);
	};
