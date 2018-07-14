import PropTypes from 'prop-types';
import { css, cx } from 'emotion-vdo';
import theme from 'tamia-theme';

const buttonStyles = css`
	${theme.mixin.noSelect};
	display: inline-block;
	height: 2em;
	padding: 0.45em 1.5em 0.35em;
	vertical-align: middle;
	line-height: 1;
	font-size: 1em;
	outline: 0;
	text-decoration: none;
	white-space: nowrap;
	cursor: pointer;
	background: linear-gradient(
		to bottom,
		${theme.form.lightBgColor},
		${theme.form.darkBgColor}
	);
	border: 1px solid ${theme.form.borderColor};
	border-bottom-color: ${theme.form.darkBorderColor};
	border-radius: ${theme.form.borderRadius};
	color: ${theme.form.buttonColor};
	box-shadow: 0 0.1em 0.1em ${theme.color.black05};
	text-shadow: 0 1px 0 ${theme.color.white40};
	transition: opacity 0.25s ease-out, border-color 0.1s ease-in-out,
		box-shadow 0.1s ease-in-out;

	&:focus {
		outline: 0;
		border-color: ${theme.form.focusColor};
		box-shadow: 0 0 0.4em ${theme.form.focusColorAlpha};
	}

	&:hover,
	&:active {
		background: linear-gradient(
			to bottom,
			${theme.form.darkBgColor},
			${theme.form.darkerBgColor}
		);
	}

	&:active {
		box-shadow: 0 0 0.4em ${theme.form.focusColorAlpha},
			inset 0 0.2em 0.6em ${theme.color.black10};
		border-color: ${theme.form.focusColor};
		transition: border-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
	}

	&[disabled] {
		cursor: default;
		pointer-events: none;
		text-shadow: none;
		opacity: 0.4;
	}
`;

const blockStyles = css`
	display: block;
	width: 100%;
`;

function Button({ component = 'button', className, block, ...rest }) {
	const classes = cx(className, buttonStyles, block && blockStyles);
	const Tag = component;
	return <Tag className={classes} {...rest} />;
}

Button.propTypes = {
	block: PropTypes.bool,
	component: PropTypes.node,
	children: PropTypes.node,
};

/** @component */
export default Button;
