import get from 'lodash/get';
import { Theme } from '../types';

const themeGet = (addr: string) => (props: { theme: Theme }) =>
	get(props.theme, addr);

export default themeGet;
