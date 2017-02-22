import facebook from 'social-share-services/facebook';
import ShareButton from './ShareButton';
import s from './ShareFacebook.pcss';

export default function(props, children) {
	return (
		<ShareButton class={s.root} name="facebook" {...props} {...facebook}>
			{children}
		</ShareButton>
	);
}
