/*
 * HTML for SVG icon (use with Fledermaus).
 */
export default function Icon({ name }, children, { safe, embedFile }) {
	return safe(embedFile(`icons/${name}.svg`));
}
