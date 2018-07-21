import get from 'lodash/get';

const themeGet = addr => props => get(props.theme, addr);

export default themeGet;
