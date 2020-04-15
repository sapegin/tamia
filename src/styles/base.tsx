import { createGlobalStyle } from 'styled-components';

const BaseStyles = createGlobalStyle`
	html {
		font-size: ${p => p.theme.baseFontSize};
		font-family: ${p => p.theme.fonts.base};
		/* Prevent adjustments of font size after orientation changes in iOS */
		-webkit-text-size-adjust: 100%;
	}

	/* box-sizing reset */
	*,
	*::before,
	*::after {
  		box-sizing: border-box;
	}

	body {
		min-height: 100vh;
		max-width: ${p => p.theme.page.bodyMaxWidth};
		margin: 0 auto;
		padding: ${p => p.theme.page.bodyPaddingY} ${p => p.theme.page.bodyPaddingX};
		color: ${p => p.theme.colors.base};
		background-color: ${p => p.theme.colors.bg};
		line-height: ${p => p.theme.lineHeights.base};
		font-weight: ${p => p.theme.fontWeights.base};
		scroll-behavior: smooth;
		word-wrap: break-word;
		text-rendering: optimizeSpeed;
		font-kerning: normal;
		font-feature-settings: "kern", "liga", "clig", "calt";
		hyphens: auto;
	}

	/* Disable hyphenation in links */
	a {
		hyphens: none;
	}

	/* Remove default margins and paddings */
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	ul,
	ol,
	dl,
	dd,
	p,
	figure,
	figcaption,
	pre,
	table,
	fieldset,
	blockquote
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

	/* Remove the weird gap below images */
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
		-webkit-tap-highlight-color: ${p => p.theme.colors.selectionAlpha};
	}

	/* Remove smooth scroll for folks who don't want too much motion */
	@media (prefers-reduced-motion: reduce) {
		* {
		  scroll-behavior: auto !important;
		}
	  }
`;

export default BaseStyles;
