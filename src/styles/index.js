import { injectGlobal } from 'emotion';
import { normalize } from 'polished';
import getBaseStyles from '../styles/base';
import getTypographyStyles from '../styles/typography';

const injectStyles = theme => {
	injectGlobal(normalize());
	injectGlobal(getBaseStyles(theme));
	injectGlobal(getTypographyStyles(theme));
};

export default injectStyles;
