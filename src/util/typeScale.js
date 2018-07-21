import { modularScale } from 'polished';

// Generate typography scale
const getTypeScale = (sizes, ratio) => {
	return Object.keys(sizes).reduce((scale, size) => {
		scale[size] = modularScale(sizes[size], 1, ratio).replace('em', 'rem');
		return scale;
	}, {});
};

export default getTypeScale;
