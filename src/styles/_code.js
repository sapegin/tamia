import { injectGlobal } from 'emotion-vdo';
import theme from 'tamia-theme';

// Use global styles because there’s no other way to share styles
// with Markdown content

// eslint-disable-next-line no-unused-expressions
injectGlobal`
	.text code,
	.text kbd {
		font-family: ${theme.font.monospace};
	}

	.text pre,
	.text pre * {
		font-family: ${theme.font.codeBlock};
	}

	.text pre {
		display: block;
		overflow: auto;
		white-space: pre-wrap;
		tab-size: 4;
		text-size-adjust: none;
	}

	.text pre code {
		display: block;
		font-size: ${theme.fontSize.codeBlock};
		line-height: 1.3;
		color: ${theme.color.base};
	}
`;
