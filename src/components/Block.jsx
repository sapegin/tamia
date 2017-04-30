import component from './component';
import s from './Block.pcss';

// TODO: check params

export default component(({ bottom = 1 }) => ({
	[s.bottom05]: bottom === 1 / 2,
	[s.bottom1]: bottom === 1,
	[s.bottom2]: bottom === 2,
	[s.bottom3]: bottom === 3,
	[s.bottom4]: bottom === 4,
	[s.bottom5]: bottom === 5,
	[s.bottom6]: bottom === 6,
	[s.bottom7]: bottom === 7,
	[s.bottom8]: bottom === 8,
}));
