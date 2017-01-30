import component from './component';
import s from './StickyFooter.pcss';

const Wrapper = component(s.footer, 'footer');

export default function($, children) {
	return (
		<Wrapper {...$}>
			<div className={s.inner}>{children}</div>
		</Wrapper>
	);
}
