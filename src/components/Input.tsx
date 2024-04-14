import { css } from '../../styled-system/css';
import { Box, type BoxProps } from './Box';

export type InputProps = Omit<BoxProps<'input'>, 'className'>;

export const Input = (props: InputProps) => (
	<Box
		{...props}
		as="input"
		className={css({
			boxSizing: 'border-box',
			display: 'block',
			width: '100%',
			height: '2rem',
			margin: 0,
			padding: 'm',
			border: 'thin',
			borderColor: 'primary',
			borderRadius: 'base',
			fontFamily: 'body',
			fontSize: 'm',
			color: 'text',
			backgroundColor: 'background',
			boxShadow: 'none',
			_focusVisible: {
				outline: 'focus',
				outlineOffset: 'token(borderWidths.focusOutlineOffset)',
			},
			_disabled: {
				opacity: 0.6,
				filter: 'saturate(60%)',
			},
		})}
	/>
);
