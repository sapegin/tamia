import vdo from 'vdo';

/*
 * Add a fingerprinted or inlined stylesheet (use with Fledermaus).
 */
export default function Style({ src, inline }, children, { inlineFile, fingerprint }) {
	const attrs = {};
	let content;
	if (inline) {
		content = inlineFile(src);
	}
	else {
		if (src) {
			attrs.href = src;
		}
		else {
			attrs.href = '/build/styles.css';
		}
		attrs.href = fingerprint(attrs.href);
		attrs.rel = 'stylesheet';
	}
	const Tag = content ? 'style' : 'link';
	return <Tag {...attrs}>{content && vdo.markSafe(content)}</Tag>;
}
