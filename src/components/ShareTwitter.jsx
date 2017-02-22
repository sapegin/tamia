import twitter from 'social-share-services/twitter';
import ShareButton from './ShareButton';
import s from './ShareTwitter.pcss';

export default function(props, children) {
	// Add a colon to improve readability
	if (!/[.?!:\-–—]\s*$/.test(props.pageTitle)) {
		props.pageTitle += ':';
	}
	return (
		<ShareButton class={s.root} name="twitter" {...props} {...twitter}>
			{children}
		</ShareButton>
	);
}
