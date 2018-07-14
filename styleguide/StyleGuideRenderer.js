import React from 'react';
import StyleGuideRendererBase from 'react-styleguidist/lib/rsg-components/StyleGuide/StyleGuideRenderer';
import { TypographyStyle } from 'react-typography';
import getTypography from '../src/typography';
import theme from '../src/theme';

const StyleGuideRenderer = props => (
	<React.Fragment>
		<TypographyStyle typography={getTypography(theme)} />
		<StyleGuideRendererBase {...props} />
	</React.Fragment>
);

export default StyleGuideRenderer;
