import PropTypes from 'prop-types';
import { css, cx } from 'emotion-vdo';
import theme from 'tamia-theme';

const fieldStyles = css`
	display: inline-block;
	height: 2em;
	padding: 0.3em 0.4em;
	vertical-align: middle;
	line-height: 1;
	font-size: 1em;
	outline: 0;
	transition: opacity 0.25s ease-out, border-color 0.1s ease-in-out,
		box-shadow 0.1s ease-in-out;
	background: ${theme.form.bgColor};
	border: 1px solid ${theme.form.borderColor};
	border-radius: ${theme.form.borderRadius};
	box-shadow: inset 0 0.05em 0.05em ${theme.color.black05};

	&[disabled] {
		cursor: default;
		pointer-events: none;
		text-shadow: none;
		opacity: 0.4;
	}

	&:focus {
		outline: 0;
		border-color: ${theme.form.focusColor};
		box-shadow: inset 0 0.05em 0.05em ${theme.color.black05},
			0 0 0.4em ${theme.form.focusColorAlpha};
	}

	/* Hide IE clear button */
	/* Not display:none because: http://bit.ly/1h3UlAH */
	&::-ms-clear {
		size: 0;
	}
`;

const blockStyles = css`
	display: block;
	width: 100%;
`;

// Vertical resizing for textareas
const textareaStyles = css`
	height: auto;
	resize: vertical;
`;

function Field({ component = 'input', className, block, ...rest }) {
	const classes = cx(className, fieldStyles, {
		[blockStyles]: block,
		[textareaStyles]: component === 'textarea',
	});
	const Tag = component;
	return <Tag className={classes} {...rest} />;
}

Field.propTypes = {
	block: PropTypes.bool,
	component: PropTypes.node,
	children: PropTypes.node,
};

/** @component */
export default Field;
