import { injectGlobal } from 'emotion';
import { normalize } from 'polished';
import getBaseStyles from '../styles/base';

const injectStyles = theme => {
	injectGlobal(normalize());
	injectGlobal(getBaseStyles(theme));
};

export default injectStyles;
