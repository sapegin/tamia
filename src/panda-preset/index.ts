import { definePreset } from '@pandacss/dev';
import { conditions } from './conditions';
import { globalCss } from './globalCss';
import { patterns } from './patterns';
import { theme } from './theme';
import { utilities } from './utilities';

export default definePreset({
	conditions,
	globalCss,
	utilities,
	patterns,
	theme,
});
