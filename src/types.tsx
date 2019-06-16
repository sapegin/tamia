import {
	Globals,
	GlobalsNumber,
	MinWidthProperty,
	MaxWidthProperty,
	MinHeightProperty,
	MaxHeightProperty,
	DisplayProperty,
	VerticalAlignProperty,
	OverflowProperty,
	PositionProperty,
	AlignItemsProperty,
	AlignContentProperty,
	JustifyItemsProperty,
	JustifyContentProperty,
	FlexWrapProperty,
	FlexDirectionProperty,
	FlexProperty,
	FlexBasisProperty,
	JustifySelfProperty,
	AlignSelfProperty,
	GridGapProperty,
	GridColumnProperty,
	GridRowProperty,
	GridAreaProperty,
	GridAutoFlowProperty,
	GridAutoRowsProperty,
	GridAutoColumnsProperty,
	GridTemplateRowsProperty,
	GridTemplateColumnsProperty,
	GridTemplateAreasProperty,
	WidthProperty,
	HeightProperty,
	ZIndexProperty,
	TopProperty,
	RightProperty,
	BottomProperty,
	LeftProperty,
	TextAlignProperty,
	FontStyleProperty,
} from 'csstype';

export interface Sizes {
	xxs: string;
	xs: string;
	s: string;
	m: string;
	l: string;
	xl: string;
	xxl: string;
	[key: string]: string;
}

export type Size = keyof Sizes;

export interface FontSizes {
	base: string;
	xs: string;
	s: string;
	m: string;
	l: string;
	xl: string;
	xxl: string;
	xxxl: string;
	xxxxl: string;
	[key: string]: string;
}

export type FontSize = keyof FontSizes;

export interface Theme {
	baseFontSize: string;
	blockMarginBottom: Size;
	headingMarginTop: Size;
	listMargin: string;
	fontSizes: FontSizes;
	space: Sizes;
	page: {
		maxWidth: string | null;
		contentMaxWidth: string | null;
		textMaxWidth: string | null;
		xPadding: Size;
		yPadding: Size;
	};
	colors: { [key: string]: string };
	fonts: { [key: string]: string };
	fontWeights: { [key: string]: string };
	lineHeights: { [key: string]: number };
	letterSpacings: { [key: string]: number };
	breakpoints: { [key: string]: number };
}

export type Length = string | number;

export type SizeProp = Size | Size[];

export type StringProp = string | string[];

export type TokenProp = string | string[];

export type NumberProp = GlobalsNumber | GlobalsNumber[];

export type LengthProp = Globals | Globals[] | Length | Length[];

export interface BaseProps {
	as?: React.FunctionComponent<any> | React.ComponentClass<any> | string;
}

export interface SpaceProps {
	m?: SizeProp;
	mt?: SizeProp;
	mr?: SizeProp;
	mb?: SizeProp;
	ml?: SizeProp;
	mx?: SizeProp;
	my?: SizeProp;
	p?: SizeProp;
	pt?: SizeProp;
	pr?: SizeProp;
	pb?: SizeProp;
	pl?: SizeProp;
	px?: SizeProp;
	py?: SizeProp;
}

export interface ColorProps {
	color?: TokenProp;
	bg?: TokenProp;
	backgroundColor?: TokenProp;
	opacity?: NumberProp;
}

export interface LayoutProps {
	width?: WidthProperty<Length> | WidthProperty<Length>[];
	height?: HeightProperty<Length> | HeightProperty<Length>[];
	minWidth?: MinWidthProperty<Length> | MinWidthProperty<Length>[];
	maxWidth?: MaxWidthProperty<Length> | MaxWidthProperty<Length>[];
	minHeight?: MinHeightProperty<Length> | MinHeightProperty<Length>[];
	maxHeight?: MaxHeightProperty<Length> | MaxHeightProperty<Length>[];
	display?: DisplayProperty | DisplayProperty[];
	verticalAlign?:
		| VerticalAlignProperty<Length>
		| VerticalAlignProperty<Length>[];
	overflow?: OverflowProperty | OverflowProperty[];
}

export interface PositionProps {
	position?: PositionProperty | PositionProperty[];
	zIndex?: ZIndexProperty | ZIndexProperty[];
	top?: TopProperty<Length> | TopProperty<Length>[];
	right?: RightProperty<Length> | RightProperty<Length>[];
	bottom?: BottomProperty<Length> | BottomProperty<Length>[];
	left?: LeftProperty<Length> | LeftProperty<Length>[];
}

export interface FlexboxProps {
	alignItems?: AlignItemsProperty | AlignItemsProperty[];
	alignContent?: AlignContentProperty | AlignContentProperty[];
	justifyItems?: JustifyItemsProperty | JustifyItemsProperty[];
	justifyContent?: JustifyContentProperty | JustifyContentProperty[];
	flexWrap?: FlexWrapProperty | FlexWrapProperty[];
	flexDirection?: FlexDirectionProperty | FlexDirectionProperty[];
	flex?: FlexProperty<Length> | FlexProperty<Length>[];
	flexGrow?: LengthProp;
	flexShrink?: LengthProp;
	flexBasis?: FlexBasisProperty<Length> | FlexBasisProperty<Length>[];
	justifySelf?: JustifySelfProperty | JustifySelfProperty[];
	alignSelf?: AlignSelfProperty | AlignSelfProperty[];
	order?: LengthProp;
}

export interface GridProps {
	gridGap?: GridGapProperty<Length> | GridGapProperty<Length>[];
	gridRowGap?: GridGapProperty<Length> | GridGapProperty<Length>[];
	gridColumnGap?: GridGapProperty<Length> | GridGapProperty<Length>[];
	gridColumn?: GridColumnProperty | GridColumnProperty[];
	gridRow?: GridRowProperty | GridRowProperty[];
	gridArea?: GridAreaProperty | GridAreaProperty[];
	gridAutoFlow?: GridAutoFlowProperty | GridAutoFlowProperty[];
	gridAutoRows?: GridAutoRowsProperty<Length> | GridAutoRowsProperty<Length>[];
	gridAutoColumns?:
		| GridAutoColumnsProperty<Length>
		| GridAutoColumnsProperty<Length>[];
	gridTemplateRows?:
		| GridTemplateRowsProperty<Length>
		| GridTemplateRowsProperty<Length>[];
	gridTemplateColumns?:
		| GridTemplateColumnsProperty<Length>
		| GridTemplateColumnsProperty<Length>[];
	gridTemplateAreas?: GridTemplateAreasProperty | GridTemplateAreasProperty[];
}

export interface TypographyProps {
	fontFamily?: TokenProp;
	fontSize?: FontSize | FontSize[];
	fontWeight?: TokenProp;
	lineHeight?: TokenProp;
	letterSpacing?: TokenProp;
	textAlign?: TextAlignProperty | TextAlignProperty[];
	fontStyle?: FontStyleProperty | FontStyleProperty[];
}
