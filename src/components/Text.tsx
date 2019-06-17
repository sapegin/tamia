import styled from '@emotion/styled';
import { space, textAlign, variant } from 'styled-system';
import { TextAlignProperty } from 'csstype';
import { BaseProps, SpaceProps } from '../types';

interface Props extends BaseProps, SpaceProps {
	variant?: string | string[];
	textAlign?: TextAlignProperty | TextAlignProperty[];
}

const Text: React.FunctionComponent<Props> = styled('p')<any>(
	space,
	textAlign,
	variant({
		scale: 'textStyles',
		prop: 'variant',
	})
);

Text.defaultProps = {
	variant: 'base',
};

/** @component */
export default Text;
