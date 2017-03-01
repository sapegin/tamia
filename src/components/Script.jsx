import vdo from 'vdo';

/*
 * Add a fingerprinted or inlined script (use with Fledermaus).
 */
export default function Script({ entry = 'main', src, inline }, children, { inlineFile, fingerprint }) {
	const url = src || `/build/${entry}.js`;

	const attrs = {};
	let content;
	if (inline) {
		content = inlineFile(url);
	}
	else {
		attrs.src = fingerprint(url);
	}

	return <script {...attrs}>{content && vdo.markSafe(content)}</script>;
}
