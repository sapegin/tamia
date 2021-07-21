import styled from 'styled-components';
import { getMaxWidth, getPaddingX } from '../styles/getters';

// Inspired by Bootstrap and Typography.js

/**
 * Container for user generated content with styles for all common HTML elements.
 */
const TextContent = styled.div`
	& h1,
	& h2,
	& h3,
	& h4,
	& h5,
	& h6,
	& hgroup,
	& ul,
	& ol,
	& dl,
	& dd,
	& p,
	& pre,
	& table,
	& blockquote,
	& form,
	& iframe,
	& img,
	& hr,
	& address {
		margin-bottom: ${(p) => p.theme.blockMarginBottom};
	}

	& h1,
	& h2,
	& h3,
	& h4,
	& h5,
	& h6,
	& ul,
	& ol,
	& p,
	& blockquote {
		max-width: ${(p) => p.theme.page.textMaxWidth};
	}

	/* Links */
	& a,
	& a:link,
	& a:visited {
		color: ${(p) => p.theme.colors.primary};
	}
	& a:hover,
	& a:active {
		color: ${(p) => p.theme.colors.hover};
	}
	& a:focus {
		outline: ${(p) => p.theme.borders.focus};
		outline-color: ${(p) => p.theme.colors.focus};
		outline-offset: ${(p) => p.theme.focusOutlineOffset};
	}

	/* Blockquotes */
	& blockquote {
		margin-left: ${(p) => p.theme.space.l};
		margin-right: ${(p) => p.theme.space.l};
		font-size: ${(p) => p.theme.fontSizes.s};
	}
	& blockquote p {
		margin-bottom: calc(${(p) => p.theme.blockMarginBottom} / 2);
	}
	& cite {
		font-style: italic;
	}
	& hr {
		border: 0;
		background: ${(p) => p.theme.colors.border};
	}

	/* Responsive images and full bleed images */
	& p > img,
	& p > a > img,
	& figure > img,
	& figure > a > img {
		height: auto;
		max-width: calc(100% + ${getPaddingX} * 2);
		margin-left: -${getPaddingX};
		margin-right: -${getPaddingX};
		margin-top: calc(${(p) => p.theme.blockMarginBottom} / 2);
		@media (min-width: ${getMaxWidth}) {
			max-width: 100%;
			margin-left: auto;
			margin-right: auto;
		}
	}

	/* Tables */
	& table {
		font-size: ${(p) => p.theme.fontSizes.s};
		border-collapse: collapse;
		width: 100%;
	}
	& thead {
		text-align: left;
		border-bottom: 2px solid ${(p) => p.theme.colors.border};
	}
	& td,
	& th {
		text-align: left;
		border-bottom: 1px solid ${(p) => p.theme.colors.border};
		padding: calc(${(p) => p.theme.blockMarginBottom} / 2);
	}
	& td {
		vertical-align: top;
	}
	& th:first-of-type,
	& td:first-of-type {
		padding-left: 0;
	}
	& th:last-child,
	& td:last-child {
		padding-right: 0;
	}
	& tbody tr:last-child td {
		border: 0;
	}

	/* Headings */
	/* Collapse margin between headings and before first heading */
	& h1,
	& h2,
	& h3,
	& h4,
	& h5,
	& h6 {
		margin-top: ${(p) => p.theme.headingMarginTop};
		font-family: ${(p) => p.theme.fonts.heading};
		line-height: ${(p) => p.theme.lineHeights.heading};
		font-weight: ${(p) => p.theme.fontWeights.heading};
		letter-spacing: ${(p) => p.theme.letterSpacings.heading};
	}

	& h1 + h2,
	& h2 + h3,
	& h3 + h4,
	& h4 + h5,
	& h5 + h6,
	& h1:first-child,
	& h2:first-child,
	& h3:first-child,
	& h4:first-child,
	& h5:first-child,
	& h6:first-child {
		margin-top: 0;
	}
	& h1 {
		font-size: ${(p) => p.theme.fontSizes.xxl};
	}
	& h2 {
		font-size: ${(p) => p.theme.fontSizes.xl};
	}
	& h3 {
		font-size: ${(p) => p.theme.fontSizes.l};
	}
	& h4 {
		line-height: ${(p) => p.theme.lineHeights.base};
		font-size: ${(p) => p.theme.fontSizes.m};
		font-weight: bold;
	}
	& h5 {
		line-height: ${(p) => p.theme.lineHeights.base};
		font-size: ${(p) => p.theme.fontSizes.m};
		font-style: italic;
	}
	& h6 {
		line-height: ${(p) => p.theme.lineHeights.base};
		font-size: ${(p) => p.theme.fontSizes.m};
	}

	/* Unordered list with dashes (—) as bullets and basic ordered list */
	& ol {
		padding-left: ${(p) => p.theme.listMargin};
	}
	& li {
		margin-bottom: calc(${(p) => p.theme.blockMarginBottom} / 2);
	}
	& li > ul,
	& li > ol {
		margin-bottom: 0;
	}
	& ul > ul,
	& ul > ol {
		margin-left: ${(p) => p.theme.listMargin};
	}
	& ul > li {
		position: relative;
		padding-left: ${(p) => p.theme.listMargin};
		margin-left: 0;
	}
	& ul > li::before {
		content: '\\2014\\a0';
		position: absolute;
		left: 0;
	}
	/* Hanging markers on big screens */
	@media (min-width: ${getMaxWidth}) {
		& ol {
			padding-left: 0;
		}
		& ul > li {
			margin-left: -${(p) => p.theme.listMargin};
		}
	}

	/* Code */
	& code,
	& kbd {
		font-family: ${(p) => p.theme.fonts.code};
		font-feature-settings: normal;
		hyphens: none;
	}
	& pre {
		display: block;
		line-height: ${(p) => p.theme.lineHeights.pre};
		font-size: ${(p) => p.theme.fontSizes.s};
		font-family: ${(p) => p.theme.fonts.pre};
		white-space: pre-wrap;
		tab-size: 4;
		text-size-adjust: none;
	}
	& pre code {
		display: block;
		font-size: inherit;
		color: inherit;
	}

	/* Don't leak the margin after the last element outside of the component */
	> *:last-child {
		margin-bottom: 0;
	}
`;

/** @component */
export default TextContent;
