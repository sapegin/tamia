import get from 'lodash/get';

const themeGet = (addr: string) => (props: { theme: any }) =>
	get(props.theme, addr);

export default themeGet;
