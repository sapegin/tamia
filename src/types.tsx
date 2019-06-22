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

export type AsProps = {
	as?: React.FunctionComponent<any> | React.ComponentClass<any> | string;
};
