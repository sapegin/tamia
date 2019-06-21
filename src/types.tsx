import {
	Globals,
	GlobalsNumber,
	PositionProperty,
	ZIndexProperty,
	TopProperty,
	RightProperty,
	BottomProperty,
	LeftProperty,
	TextAlignProperty,
	FontStyleProperty,
} from 'csstype';

export type Sizes = {
	xxs: string;
	xs: string;
	s: string;
	m: string;
	l: string;
	xl: string;
	xxl: string;
	[key: string]: string;
};

export type Size = keyof Sizes;

export type FontSizes = {
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
};

export type FontSize = keyof FontSizes;

export type Length = string | number;

export type SizeProp = Size | Size[];

export type StringProp = string | string[];

export type TokenProp = string | string[];

export type NumberProp = GlobalsNumber | GlobalsNumber[];

export type LengthProp = Globals | Globals[] | Length | Length[];

export type AsProps = {
	as?: React.FunctionComponent<any> | React.ComponentClass<any> | string;
};

export type PositionProps = {
	position?: PositionProperty | PositionProperty[];
	zIndex?: ZIndexProperty | ZIndexProperty[];
	top?: TopProperty<Length> | TopProperty<Length>[];
	right?: RightProperty<Length> | RightProperty<Length>[];
	bottom?: BottomProperty<Length> | BottomProperty<Length>[];
	left?: LeftProperty<Length> | LeftProperty<Length>[];
};

export type TypographyProps = {
	fontFamily?: TokenProp;
	fontSize?: FontSize | FontSize[];
	fontWeight?: TokenProp;
	lineHeight?: TokenProp;
	letterSpacing?: TokenProp;
	textAlign?: TextAlignProperty | TextAlignProperty[];
	fontStyle?: FontStyleProperty | FontStyleProperty[];
};
