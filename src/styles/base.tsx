import { createGlobalStyle } from 'styled-components';

const BaseStyles = createGlobalStyle`
	html {
		box-sizing: border-box;
		overflow-y: scroll;
		font-size: ${p => p.theme.baseFontSize};
		font-family: ${p => p.theme.fonts.base};
	}

	/* box-sizing reset */
	*, *:before, *:after {
		box-sizing: inherit;
	}

	body {
		max-width: ${p => p.theme.page.maxWidth};
		margin-left: auto;
		margin-right: auto;
		padding: 0 ${p => p.theme.page.xPadding};
		color: ${p => p.theme.colors.base};
		background-color: ${p => p.theme.colors.bg};
		line-height: ${p => p.theme.lineHeights.base};
		font-weight: ${p => p.theme.fontWeights.base};
		word-wrap: break-word;
		font-kerning: normal;
		font-feature-settings: "kern", "liga", "clig", "calt";
		hyphens: auto;
	}

	/* Remove default margins and paddings */

		h1,
		h2,
		h3,
		h4,
		h5,
		h6,
		hgroup,
		ul,
		ol,
		dl,
		dd,
		p,
		figure,
		pre,
		table,
		fieldset,
		blockquote,
		form,
		noscript,
		iframe,
		img,
		hr,
		address
	 {
		margin: 0;
		padding: 0;
	}

	/* Remove bullets */
	ul {
		list-style: none;
	}

	h1, h2, h3, h4, h5, h6 {
		text-rendering: optimizeLegibility;
	}

	/* Monospace digits */
	table {
		font-feature-settings: "tnum";
	}

	/* Remove ugly bottom border */
	abbr, acronym {
		border-bottom: 0;
		cursor: default;
	}

	/* Abbreviations with spacing */
	abbr {
		letter-spacing: 0.1em;
		margin-right: -0.1em;
	}

	/* Sane default values */
	img {
		vertical-align: middle;
	};

	/* Do not allow horizontal resizing because it breaks layout */
	textarea {
		resize: vertical;
	}

	/* Fix hidden in IE10 and prevent accidental display with CSS */
	[hidden] {
		display: none !important;
	}

	/* Text selection */
	::selection {
		color: ${p => p.theme.colors.base};
		background: ${p => p.theme.colors.selection};
		text-shadow: none;
	}

	/* iOS tap highlighting */
	a:link {
		WebkitTapHighlightColor: ${p => p.theme.colors.selectionAlpha};
	}
`;

export default BaseStyles;
