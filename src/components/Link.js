import component from './component';
import s from './Link.pcss';

export default component($ => [s.link, $.quoted && s.isQuoted], 'a');
