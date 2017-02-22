import isFunction from 'lodash/isFunction';
import cx from 'classnames';
import htmlAttrs from 'html-attrs';
import pickBy from 'lodash/pickBy';

/**
 * Component factory.
 *
 * @param {Function|string} className
 * @param {string} [defaultTag='div']
 * @return {VDO}
 */
export default (className, defaultTag = 'div') => ($ = {}, children) => {
	const Tag = $.component || defaultTag;  // eslint-disable-line no-unused-vars
	const classes = isFunction(className) ? className($) : className;
	const attrs = pickBy($, (value, key) => key.startsWith('on') || htmlAttrs.includes(key));
	return (
		<Tag {...attrs} class={cx(classes, $.class)}>
			{children}
		</Tag>
	);
};
