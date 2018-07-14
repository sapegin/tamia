import { injectGlobal } from 'emotion-vdo';
import theme from 'tamia-theme';

// Use global styles because there’s no other way to share styles
// with Markdown content

// eslint-disable-next-line no-unused-expressions
injectGlobal`
	.alpha,
	.text h1,
	.beta,
	.text h2,
	.gamma,
	.text h3,
	.delta,
	.text h4,
	.epsilon,
	.text h5 {
		font-family: ${theme.font.heading};
		margin-top: ${theme.heading.marginTop};
		margin-bottom: ${theme.heading.marginBottom};
		line-height: ${theme.heading.lineHeight};
	}

	.alpha,
	.text h1 {
		font-size: ${theme.heading.alphaSize};
		margin-left: calc(${theme.heading.alphaSize} / -20);
		font-weight: ${theme.heading.alphaWeight};
	}

	.beta,
	.text h2 {
		font-size: ${theme.heading.betaSize};
		margin-left: calc(${theme.heading.betaSize} / -20);
		font-weight: ${theme.heading.betaWeight};
	}

	.gamma,
	.text h3 {
		font-size: ${theme.heading.gammaSize};
		margin-left: calc(${theme.heading.gammaSize} / -20);
		font-weight: ${theme.heading.gammaWeight};
	}

	.delta,
	.text h4 {
		font-size: ${theme.heading.deltaSize};
		margin-left: calc(${theme.heading.deltaSize} / -20);
		font-weight: ${theme.heading.deltaWeight};
	}

	.epsilon,
	.text h5 {
		font-size: ${theme.heading.epsilonSize};
		margin-left: calc(${theme.heading.epsilonSize} / -20);
		font-weight: ${theme.heading.epsilonWeight};
	}

	/* Collapse margin between headings and before first heading */
	.text h1 + h2,
	.text h2 + h3,
	.text h3 + h4,
	.text h4 + h5,
	.alpha + .beta,
	.beta + .gamma,
	.gamma + .delta,
	.delta + .epsilon,
	h1:first-child,
	h2:first-child,
	h3:first-child,
	h4:first-child,
	h5:first-child,
	.alpha:first-child,
	.beta:first-child,
	.gamma:first-child,
	.delta:first-child {
		margin-top: 0;
	}
`;
