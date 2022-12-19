import { getCss } from './css';
import { get } from './util/get';
import type { CSSProps, Theme } from './types';

interface VariantOptions {
	scale: string;
	prop: string;
}

export const variant =
	({ scale, prop }: VariantOptions) =>
	(props: { theme?: Theme } = {}) => {
		const variantName = get<string>(props, prop);
		if (variantName === undefined) {
			console.warn(`No variant prop '${prop}' passed to the component `);
			return {};
		}

		const theme = props.theme || {};
		const variants = get<Record<string, CSSProps>>(theme, scale);
		if (variants === undefined) {
			console.warn(
				`The scale '${scale}' is
				 not found in the theme, available scales are:`,
				Object.keys(theme)
			);
			return {};
		}

		const styles = get<CSSProps>(variants, variantName);
		if (styles === undefined) {
			console.warn(
				`No styles found for a variant at 'theme.${scale}.${variantName}'`
			);
			return {};
		}

		return getCss(styles, theme);
	};
