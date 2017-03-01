import vdo from 'vdo';

/*
 * Add a fingerprinted or inlined stylesheet (use with Fledermaus).
 */
export default function Style({ entry = 'styles', src, inline }, children, { inlineFile, fingerprint }) {
	const url = src || `/build/${entry}.css`;

	const attrs = {};
	let content;
	if (inline) {
		content = inlineFile(url);
	}
	else {
		attrs.href = fingerprint(url);
		attrs.rel = 'stylesheet';
	}
	const Tag = content ? 'style' : 'link';
	return <Tag {...attrs}>{content && vdo.markSafe(content)}</Tag>;
}
