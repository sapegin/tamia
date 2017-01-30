import vdo from 'vdo';

/*
 * Add a fingerprinted or inlined script (use with Fledermaus).
 */
export default function Script({ entry, src, inline }, children, { inlineFile, fingerprint }) {
	let url;
	if (entry) {
		url = `/build/${entry}.js`;
	}
	else if (src) {
		url = src;
	}
	else {
		url = '/build/main.js';
	}

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
