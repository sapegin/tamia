import component from './component';
import s from './Layout.pcss';

// TODO: check params

export default component(({ size, sm, md, lg, xl }) => {
	const isColumn = size || sm || md || lg || xl;
	return {
		[s.row]: !isColumn,
		[s.column]: isColumn,

		// Default
		[s.sixth]: size === 1 / 6,
		[s.quarter]: size === 1 / 4,
		[s.threeQuarters]: size === 3 / 4,
		[s.third]: size === 1 / 3,
		[s.twoThirds]: size === 2 / 3,
		[s.half]: size === 1 / 2,

		// Small
		[s.smallSixth]: sm === 1 / 6,
		[s.smallQuarter]: sm === 1 / 4,
		[s.smallThreeQuarters]: sm === 3 / 4,
		[s.smallThird]: sm === 1 / 3,
		[s.smallTwoThirds]: sm === 2 / 3,
		[s.smallHalf]: sm === 1 / 2,

		// Medium
		[s.mediumSixth]: md === 1 / 6,
		[s.mediumQuarter]: md === 1 / 4,
		[s.mediumThreeQuarters]: md === 3 / 4,
		[s.mediumThird]: md === 1 / 3,
		[s.mediumTwoThirds]: md === 2 / 3,
		[s.mediumHalf]: md === 1 / 2,

		// Large
		[s.largeSixth]: lg === 1 / 6,
		[s.largeQuarter]: lg === 1 / 4,
		[s.largeThreeQuarters]: lg === 3 / 4,
		[s.largeThird]: lg === 1 / 3,
		[s.largeTwoThirds]: lg === 2 / 3,
		[s.largeHalf]: lg === 1 / 2,

		// Huge
		[s.hugeSixth]: xl === 1 / 6,
		[s.hugeQuarter]: xl === 1 / 4,
		[s.hugeThreeQuarters]: xl === 3 / 4,
		[s.hugeThird]: xl === 1 / 3,
		[s.hugeTwoThirds]: xl === 2 / 3,
		[s.hugeHalf]: xl === 1 / 2,
	};
});
