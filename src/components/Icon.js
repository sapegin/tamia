import PropTypes from 'prop-types';

/** HTML for SVG icon (use with Fledermaus). */
function Icon({ name }, children, { safe, embedFile }) {
	return safe(embedFile(`icons/${name}.svg`));
}

Icon.propTypes = {
	name: PropTypes.string.isRequired,
};

/** @component */
export default Icon;
