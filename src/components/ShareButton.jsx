import Link from './Link';
import castArray from 'lodash/castArray';
import cx from 'classnames';
import s from './ShareButton.pcss';

export default function(
	{ pageUrl, pageTitle, name, icon, popupUrl, popupWidth, popupHeight, ...props },
	children
) {
	const href = popupUrl
		.replace('{url}', pageUrl)
		.replace('{title}', pageTitle)
	;
	const script = [
		'event.preventDefault();',
		`var w=window.open(this.href,'${name}',`,
		`'left='+Math.round(screen.width/2-${popupWidth / 2})+',`,
		`top='+(screen.height>${popupHeight}?Math.round(screen.height/3-${popupHeight / 2}):0)+',`,
		`width=${popupWidth},height=${popupHeight},personalbar=0,toolbar=0,scrollbars=1,resizable=1');`,
		'w&&w.focus()',
	].join('');
	return (
		<Link class={cx(s.root, props.class)} href={href} onclick={script} quoted>
			<svg class={s.icon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
				${castArray(icon).map(p => <path d={p} />)}
			</svg>
			<u class={s.label}>{children}</u>
		</Link>
	);
}
