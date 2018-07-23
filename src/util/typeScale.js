import { modularScale } from 'polished';

// Generate typography scale
const getTypeScale = (sizes, ratio) => {
	return Object.keys(sizes).reduce((scale, size) => {
		// Convert to rems and remove unnecessary precision
		const value = parseFloat(modularScale(sizes[size], 1, ratio));
		scale[size] = `${Math.round(value * 1000) / 1000}rem`;
		return scale;
	}, {});
};

export default getTypeScale;
