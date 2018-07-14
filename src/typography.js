import Typography from 'typography';
import reduce from 'lodash/reduce';
import getTypographyTheme from './styles/typographyTheme';

const SCOPE = '.text';
const EXCEPTIONS = ['html', 'body', '*', '*:before', '*:after', 'img'];

const getTypography = theme =>
	new Typography({
		...getTypographyTheme(theme),
		plugins: [
			// Score most of Typography styles inside a class name
			(vr, options, prevStyles) => {
				return reduce(
					prevStyles,
					(styles, value, key) => {
						if (EXCEPTIONS.includes(key)) {
							styles[key] = { ...value };
						} else {
							styles[key] = null;
							styles[`${SCOPE} ${key}`] = { ...value };
						}
						return styles;
					},
					{}
				);
			},
		],
	});

export default getTypography;
