import type * as CSS from 'csstype';

// TODO: Why do we have 0 here?
export type TLengthTamia = string | 0 | number;

export interface Theme<TLength = TLengthTamia> {
	// Media queries
	breakpoints?: TLengthTamia[];
	mediaQueries?: Record<string, string>;

	// Design tokens
	space?: Record<string, TLength>;
	fontSizes?: Record<string, TLength>;
	colors?: Record<string, CSS.Property.Color>;
	fonts?: Record<string, CSS.Property.FontFamily>;
	fontWeights?: Record<string, CSS.Property.FontWeight>;
	lineHeights?: Record<string, TLength>;
	letterSpacings?: Record<string, TLength>;
	sizes?: Record<
		string,
		| CSS.Property.Height<Record<string, unknown>>
		| CSS.Property.Width<Record<string, unknown>>
	>;
	borders?: Record<string, CSS.Property.Border<Record<string, unknown>>>;
	borderStyles?: Record<string, CSS.Property.Border<Record<string, unknown>>>;
	borderWidths?: Record<string, TLength>;
	radii?: Record<string, TLength>;
	shadows?: Record<string, CSS.Property.BoxShadow>;
	transitions?: Record<string, CSS.Property.Transition>;
	zIndices?: Record<string, CSS.Property.ZIndex>;

	// Variants
	headingStyles?: Record<string, CSSProps>;
	textStyles?: Record<string, CSSProps>;

	// Tamia extensions
	baseFontSize: TLength;
	blockMarginBottom: TLength;
	headingMarginTop: TLength;
	listMargin: TLength;
	focusOutlineOffset: TLength;
	page: {
		bodyMaxWidth?: TLength;
		bodyPaddingX: TLength;
		bodyPaddingY: TLength;
		contentMaxWidth?: TLength;
		contentPaddingX: TLength;
		contentPaddingY: TLength;
		textMaxWidth: TLength;
	};
}

type RequiredTheme = Required<Theme>;

export type ResponsiveValue<T> = T | null | (T | null)[];

type ThemeValue<
	K extends keyof ThemeType,
	ThemeType
> = ThemeType[K] extends Record<infer E, unknown> ? E : never;

export interface SpaceProps<
	ThemeType extends Theme = RequiredTheme,
	TVal = ThemeValue<'space', ThemeType>
> {
	/** Margin on top, left, bottom and right */
	m?: ResponsiveValue<TVal | 'auto'>;
	/** Margin on top, left, bottom and right */
	margin?: ResponsiveValue<TVal | 'auto'>;
	/** Margin on top */
	mt?: ResponsiveValue<TVal | 'auto'>;
	/** Margin on top */
	marginTop?: ResponsiveValue<TVal | 'auto'>;
	/** Margin on right */
	mr?: ResponsiveValue<TVal | 'auto'>;
	/** Margin on right */
	marginRight?: ResponsiveValue<TVal | 'auto'>;
	/** Margin on bottom */
	mb?: ResponsiveValue<TVal | 'auto'>;
	/** Margin on bottom */
	marginBottom?: ResponsiveValue<TVal | 'auto'>;
	/** Margin on left */
	ml?: ResponsiveValue<TVal | 'auto'>;
	/** Margin on left */
	marginLeft?: ResponsiveValue<TVal | 'auto'>;
	/** Margin on left and right */
	mx?: ResponsiveValue<TVal | 'auto'>;
	/** Margin on left and right */
	marginX?: ResponsiveValue<TVal | 'auto'>;
	/** Margin on top and bottom */
	my?: ResponsiveValue<TVal | 'auto'>;
	/** Margin on top and bottom */
	marginY?: ResponsiveValue<TVal | 'auto'>;
	/** Padding on top, left, bottom and right */
	p?: ResponsiveValue<TVal>;
	/** Padding on top, left, bottom and right */
	padding?: ResponsiveValue<TVal>;
	/** Padding on top */
	pt?: ResponsiveValue<TVal>;
	/** Padding on top */
	paddingTop?: ResponsiveValue<TVal>;
	/** Padding on right */
	pr?: ResponsiveValue<TVal>;
	/** Padding on right */
	paddingRight?: ResponsiveValue<TVal>;
	/** Padding on bottom */
	pb?: ResponsiveValue<TVal>;
	/** Padding on bottom */
	paddingBottom?: ResponsiveValue<TVal>;
	/** Padding on left */
	pl?: ResponsiveValue<TVal>;
	/** Padding on left */
	paddingLeft?: ResponsiveValue<TVal>;
	/** Padding on left and right */
	px?: ResponsiveValue<TVal>;
	/** Padding on left and right */
	paddingX?: ResponsiveValue<TVal>;
	/** Padding on top and bottom */
	py?: ResponsiveValue<TVal>;
	/** Padding on top and bottom */
	paddingY?: ResponsiveValue<TVal>;
}

interface OpacityProps {
	/**
	 * The opacity CSS property sets the transparency of an element or the degree to which content
	 * behind an element is visible.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity)
	 */
	opacity?: ResponsiveValue<CSS.Property.Opacity>;
}

interface ColorsProps<
	ThemeType extends Theme = RequiredTheme,
	TVal = ThemeValue<'colors', ThemeType>
> {
	/**
	 * The color utility parses a component's `color` and `bg` props and converts them into CSS declarations.
	 * By default the raw value of the prop is returned.
	 *
	 * Color palettes can be configured with the ThemeProvider to use keys as prop values, with support for dot notation.
	 * Array values are converted into responsive values.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/color)
	 */
	color?: ResponsiveValue<TVal>;
	/**
	 * The color utility parses a component's `color` and `bg` props and converts them into CSS declarations.
	 * By default the raw value of the prop is returned.
	 *
	 * Color palettes can be configured with the ThemeProvider to use keys as prop values, with support for dot notation.
	 * Array values are converted into responsive values.
	 *
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color)
	 */
	bg?: ResponsiveValue<TVal>;
	backgroundColor?: ResponsiveValue<TVal>;
}

export interface ColorProps<ThemeType extends Theme = RequiredTheme>
	extends ColorsProps<
			ThemeType,
			ThemeValue<'colors', ThemeType> | CSS.Property.Color
		>,
		OpacityProps {}

interface BackgroundBasicProps {
	/**
	 * The background-image CSS property sets one or more background images on an element.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image)
	 */
	backgroundImage?: ResponsiveValue<CSS.Property.BackgroundImage> | undefined;
	/**
	 * The background-repeat CSS property sets how background images are repeated. A background
	 * image can be repeated along the horizontal and vertical axes, or not repeated at all.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat)
	 */
	backgroundRepeat?: ResponsiveValue<CSS.Property.BackgroundRepeat> | undefined;
}

interface BackgroundSizesProps<
	TVal = CSS.Property.BackgroundSize<TLengthTamia>
> {
	/**
	 * The background shorthand CSS property sets all background style properties at once,
	 * such as color, image, origin and size, repeat method, and others.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/background)
	 */
	background?: ResponsiveValue<TVal>;
	/**
	 * The background-size CSS property sets the size of the element's background image. The
	 * image can be left to its natural size, stretched, or constrained to fit the available space.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size)
	 */
	backgroundSize?: ResponsiveValue<TVal>;
	/**
	 * The background-position CSS property sets the initial position for each background image. The
	 * position is relative to the position layer set by background-origin.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position)
	 */
	backgroundPosition?: ResponsiveValue<TVal>;
}

export interface BackgroundProps
	extends BackgroundBasicProps,
		BackgroundSizesProps {}

interface FontSizeProps<
	ThemeType extends Theme = RequiredTheme,
	TVal = ThemeValue<'fontSizes', ThemeType>
> {
	/**
	 * The font-size CSS property sets the size of the font.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size)
	 *
	 */
	fontSize?: ResponsiveValue<TVal>;
}

export interface FontWeightProps<
	ThemeType extends Theme = RequiredTheme,
	TVal = ThemeValue<'fontWeights', ThemeType>
> {
	/**
	 * The font-weight CSS property specifies the weight (or boldness) of the font.
	 *
	 * The font weights available to you will depend on the font-family you are using. Some fonts are only available in normal and bold.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight)
	 */
	fontWeight?: ResponsiveValue<TVal>;
}

interface LineHeightProps<
	ThemeType extends Theme = RequiredTheme,
	TVal = ThemeValue<'lineHeights', ThemeType>
> {
	/**
	 * The line-height CSS property sets the amount of space used for lines, such as in text. On block-level elements,
	 * it specifies the minimum height of line boxes within the element.
	 *
	 * On non-replaced inline elements, it specifies the height that is used to calculate line box height.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height)
	 */
	lineHeight?: ResponsiveValue<TVal>;
}

interface LetterSpacingProps<
	ThemeType extends Theme = RequiredTheme,
	TVal = ThemeValue<'letterSpacings', ThemeType>
> {
	/**
	 * The letter-spacing CSS property sets the spacing behavior between text characters.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing)
	 */
	letterSpacing?: ResponsiveValue<TVal>;
}

export interface TypographyCoreProps {
	textAlign?: ResponsiveValue<CSS.Property.TextAlign>;
	/**
	 * The font-style CSS property specifies whether a font should be styled with a normal, italic,
	 * or oblique face from its font-family.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style)
	 */
	fontStyle?: ResponsiveValue<CSS.Property.FontStyle>;
}

interface TypographyExtraProps {
	fontFamily?: ResponsiveValue<CSS.Property.FontFamily>;
	textDecoration?: ResponsiveValue<CSS.Property.TextDecoration>;
	textDecorationThickness?: ResponsiveValue<CSS.Property.TextDecorationThickness>;
	textUnderlineOffset?: ResponsiveValue<CSS.Property.TextUnderlineOffset>;
}

export interface TypographyProps<ThemeType extends Theme = RequiredTheme>
	extends TypographyCoreProps,
		TypographyExtraProps,
		FontSizeProps<
			ThemeType,
			ThemeValue<'fontSizes', ThemeType> | CSS.Property.FontSize | TLengthTamia
		>,
		FontWeightProps<
			ThemeType,
			| ThemeValue<'fontWeights', ThemeType>
			| CSS.Property.FontWeight
			| TLengthTamia
		>,
		LineHeightProps<
			ThemeType,
			| ThemeValue<'lineHeights', ThemeType>
			| CSS.Property.LineHeight
			| TLengthTamia
		>,
		LetterSpacingProps<
			ThemeType,
			| ThemeValue<'letterSpacings', ThemeType>
			| CSS.Property.LetterSpacing
			| TLengthTamia
		> {}

export interface ShadowProps {
	/**
	 * The box-shadow CSS property adds shadow effects around an element's frame. You can set multiple effects separated
	 * by commas. A box shadow is described by X and Y offsets relative to the element, blur and spread radii and color.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)
	 */
	boxShadow?: ResponsiveValue<CSS.Property.BoxShadow | number> | undefined;
	/**
	 * The `text-shadow` CSS property adds shadows to text. It accepts a comma-separated list of shadows to be applied
	 * to the text and any of its `decorations`. Each shadow is described by some combination of X and Y offsets from
	 * the element, blur radius, and color.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow)
	 */
	textShadow?: ResponsiveValue<CSS.Property.TextShadow | number> | undefined;
}

interface LayoutBasicProps {
	/**
	 * The display CSS property defines the display type of an element, which consists of the two basic qualities
	 * of how an element generates boxes — the outer display type defining how the box participates in flow layout,
	 * and the inner display type defining how the children of the box are laid out.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
	 */
	display?: ResponsiveValue<CSS.Property.Display>;
	/**
	 * The overflow CSS property sets what to do when an element's content is too big to fit in its block
	 * formatting context. It is a shorthand for overflow-x and overflow-y.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
	 */
	overflow?: ResponsiveValue<CSS.Property.Overflow>;
	/**
	 * The overflow-x CSS property sets what shows when content overflows a block-level element's left
	 * and right edges. This may be nothing, a scroll bar, or the overflow content.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x)
	 */
	overflowX?: ResponsiveValue<CSS.Property.OverflowX>;
	/**
	 * The overflow-y CSS property sets what shows when content overflows a block-level element's top
	 * and bottom edges. This may be nothing, a scroll bar, or the overflow content.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y)
	 */
	overflowY?: ResponsiveValue<CSS.Property.OverflowY>;
}

interface LayoutSizeProps<TVal = CSS.Property.Width<TLengthTamia>> {
	/**
	 *   The width utility parses a component's `width` prop and converts it into a CSS width declaration.
	 *
	 *   - Numbers from 0-1 are converted to percentage widths.
	 *   - Numbers greater than 1 are converted to pixel values.
	 *   - String values are passed as raw CSS values.
	 *   - And arrays are converted to responsive width styles.
	 */
	width?: ResponsiveValue<TVal>;
	/**
	 * The max-width CSS property sets the maximum width of an element.
	 * It prevents the used value of the width property from becoming larger than the value specified by max-width.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width)
	 */
	maxWidth?: ResponsiveValue<TVal>;
	/**
	 * The min-width CSS property sets the minimum width of an element.
	 * It prevents the used value of the width property from becoming smaller than the value specified for min-width.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/min-width)
	 */
	minWidth?: ResponsiveValue<TVal>;
	/**
	 * The height CSS property specifies the height of an element. By default, the property defines the height of the
	 * content area. If box-sizing is set to border-box, however, it instead determines the height of the border area.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/height)
	 */
	height?: ResponsiveValue<TVal>;
	/**
	 * The max-height CSS property sets the maximum height of an element. It prevents the used value of the height
	 * property from becoming larger than the value specified for max-height.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/max-height)
	 */
	maxHeight?: ResponsiveValue<TVal>;
	/**
	 * The min-height CSS property sets the minimum height of an element. It prevents the used value of the height
	 * property from becoming smaller than the value specified for min-height.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
	 */
	minHeight?: ResponsiveValue<TVal>;
	size?: ResponsiveValue<TVal>;
	/**
	 * The vertical-align CSS property specifies sets vertical alignment of an inline or table-cell box.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align)
	 */
	verticalAlign?: ResponsiveValue<TVal>;
}

export interface LayoutProps extends LayoutBasicProps, LayoutSizeProps {}

interface FlexboxBasicProps {
	/**
	 * The CSS align-items property sets the align-self value on all direct children as a group. The align-self
	 * property sets the alignment of an item within its containing block.
	 *
	 * In Flexbox it controls the alignment of items on the Cross Axis, in Grid Layout it controls the alignment
	 * of items on the Block Axis within their grid area.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)
	 */
	alignItems?: ResponsiveValue<CSS.Property.AlignItems>;
	/**
	 * The CSS align-content property sets how the browser distributes space between and around content items
	 * along the cross-axis of a flexbox container, and the main-axis of a grid container.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content)
	 */
	alignContent?: ResponsiveValue<CSS.Property.AlignContent> | undefined;
	/**
	 * The align-self CSS property aligns flex items of the current flex line overriding the align-items value.
	 *
	 * If any of the item's cross-axis margin is set to auto, then align-self is ignored. In Grid layout align-self
	 * aligns the item inside the grid area.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-self)
	 */
	alignSelf?: ResponsiveValue<CSS.Property.AlignSelf>;
	/**
	 * The CSS justify-items property defines the default justify-self for all items of the box, giving them all
	 * a default way of justifying each box along the appropriate axis.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items)
	 */
	justifyItems?: ResponsiveValue<CSS.Property.JustifyItems> | undefined;
	/**
	 * The CSS justify-content property defines how the browser distributes space between and around content items
	 * along the main-axis of a flex container, and the inline axis of a grid container.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content)
	 */
	justifyContent?: ResponsiveValue<CSS.Property.JustifyContent> | undefined;
	/**
	 * The CSS justify-self property set the way a box is justified inside its alignment container along
	 * the appropriate axis.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self)
	 */
	justifySelf?: ResponsiveValue<CSS.Property.JustifySelf> | undefined;
	/**
	 * The flex-wrap CSS property sets whether flex items are forced onto one line or can wrap onto multiple lines.
	 * If wrapping is allowed, it sets the direction that lines are stacked.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap)
	 */
	flexWrap?: ResponsiveValue<CSS.Property.FlexWrap>;
	/**
	 * The flex-direction CSS property specifies how flex items are placed in the flex container defining the main
	 * axis and the direction (normal or reversed).
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction)
	 */
	flexDirection?: ResponsiveValue<CSS.Property.FlexDirection> | undefined;
	/**
	 * The order CSS property sets the order to lay out an item in a flex or grid container. Items in a container
	 * are sorted by ascending order value and then by their source code order.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/order)
	 */
	order?: ResponsiveValue<CSS.Property.Order>;
	/**
	 * The flex-grow CSS property sets the flex grow factor of a flex item main size. It specifies how much of the
	 * remaining space in the flex container should be assigned to the item (the flex grow factor).
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow)
	 */
	flexGrow?: ResponsiveValue<CSS.Property.FlexGrow>;
	/**
	 * The flex-shrink CSS property sets the flex shrink factor of a flex item. If the size of all flex items is larger
	 * than the flex container, items shrink to fit according to flex-shrink.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink)
	 */
	flexShrink?: ResponsiveValue<CSS.Property.FlexShrink>;
}

interface FlexboxSizesProps<TVal = CSS.Property.FlexBasis<TLengthTamia>> {
	// TODO: The FlexBasisValue currently really only exists for documentation
	//       purposes, because flex-basis also accepts `Nem` and `Npx` strings.
	//       Not sure there’s a way to still have the union values show up as
	//       auto-completion results.
	flexBasis?: ResponsiveValue<TVal>;
	/**
	 * The flex CSS property specifies how a flex item will grow or shrink so as to fit the space available in
	 * its flex container. This is a shorthand property that sets flex-grow, flex-shrink, and flex-basis.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex)
	 */
	flex?: ResponsiveValue<TVal>;
	/**
	 * The gap CSS property sets the gaps (gutters) between rows and columns. It is a shorthand for row-gap
	 * and column-gap.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/gap)
	 */
	gap?: ResponsiveValue<TVal>;
	/**
	 * The column-gap CSS property sets the gaps (gutters) between columns.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap)
	 */
	columnGap?: ResponsiveValue<TVal>;
	/**
	 * The row-gap CSS property sets the gaps (gutters) between rows.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap)
	 */
	rowGap?: ResponsiveValue<TVal>;
}

export interface FlexboxProps extends FlexboxBasicProps, FlexboxSizesProps {}

interface GridBasicProps {
	/**
	 * The grid-column CSS property is a shorthand property for grid-column-start and grid-column-end specifying
	 * a grid item's size and location within the grid column by contributing a line, a span, or nothing (automatic)
	 * to its grid placement, thereby specifying the inline-start and inline-end edge of its grid area.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column)
	 */
	gridColumn?: ResponsiveValue<CSS.Property.GridColumn>;
	/**
	 * The grid-row CSS property is a shorthand property for grid-row-start and grid-row-end specifying a grid item’s
	 * size and location within the grid row by contributing a line, a span, or nothing (automatic) to its grid
	 * placement, thereby specifying the inline-start and inline-end edge of its grid area.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row)
	 */
	gridRow?: ResponsiveValue<CSS.Property.GridRow>;
	/**
	 * The grid-auto-flow CSS property controls how the auto-placement algorithm works, specifying exactly
	 * how auto-placed items get flowed into the grid.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow)
	 */
	gridAutoFlow?: ResponsiveValue<CSS.Property.GridAutoFlow> | undefined;
	/**
	 * The grid-template-areas CSS property specifies named grid areas.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas)
	 */
	gridTemplateAreas?:
		| ResponsiveValue<CSS.Property.GridTemplateAreas>
		| undefined;
	/**
	 * The grid-area CSS property is a shorthand property for grid-row-start, grid-column-start, grid-row-end
	 * and grid-column-end, specifying a grid item’s size and location within the grid row by contributing a line,
	 * a span, or nothing (automatic) to its grid placement, thereby specifying the edges of its grid area.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area)
	 */
	gridArea?: ResponsiveValue<CSS.Property.GridArea>;
}

interface GridSizesProps<TVal = CSS.Property.GridGap<TLengthTamia>> {
	/**
	 * The gap CSS property sets the gaps (gutters) between rows and columns. It is a shorthand for row-gap
	 * and column-gap.
	 *
	 * @deprecated use gap
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/gap)
	 */
	gridGap?: ResponsiveValue<TVal>;
	/**
	 * The column-gap CSS property sets the size of the gap (gutter) between an element's columns.
	 *
	 * @deprecated use column-gap
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap)
	 */
	gridColumnGap?: ResponsiveValue<TVal>;
	/**
	 * The row-gap CSS property sets the size of the gap (gutter) between an element's rows.
	 *
	 * @deprecated use row-gap
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap)
	 */
	gridRowGap?: ResponsiveValue<TVal>;
	/**
	 * The grid-auto-columns CSS property specifies the size of an implicitly-created grid column track.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-columns)
	 */
	gridAutoColumns?: ResponsiveValue<TVal>;
	/**
	 * The grid-auto-rows CSS property specifies the size of an implicitly-created grid row track.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-rows)
	 */
	gridAutoRows?: ResponsiveValue<TVal>;
	/**
	 * The grid-template-columns CSS property defines the line names and track sizing functions of the grid columns.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns)
	 */
	gridTemplateColumns?: ResponsiveValue<TVal>;
	/**
	 * The grid-template-rows CSS property defines the line names and track sizing functions of the grid rows.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/row-template-rows)
	 */
	gridTemplateRows?: ResponsiveValue<TVal>;
}

export interface GridProps extends GridBasicProps, GridSizesProps {}

interface BorderWidthProps<
	ThemeType extends Theme = RequiredTheme,
	TVal = ThemeValue<'borderWidths', ThemeType>
> {
	/**
	 * The border-width shorthand CSS property sets the width of all sides of an element's border.
	 *
	 * [MDN * reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-width)
	 */
	borderWidth?: ResponsiveValue<TVal>;
	/**
	 * The border-top-width CSS property sets the width of the top border of an element.
	 *
	 * [MDN * reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-width)
	 */
	borderTopWidth?: ResponsiveValue<TVal>;
	/**
	 * The border-bottom-width CSS property sets the width of the bottom border of an element.
	 *
	 * [MDN * reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-width)
	 */
	borderBottomWidth?: ResponsiveValue<TVal>;
	/**
	 * The border-left-width CSS property sets the width of the left border of an element.
	 *
	 * [MDN * reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-width)
	 */
	borderLeftWidth?: ResponsiveValue<TVal>;
	/**
	 * The border-right-width CSS property sets the width of the right border of an element.
	 *
	 * [MDN * reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-width)
	 */
	borderRightWidth?: ResponsiveValue<TVal>;
}

interface BorderStyleProps {
	/**
	 * The border-style shorthand CSS property sets the style of all sides of an element's border.
	 *
	 * [MDN * reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-style)
	 */
	borderStyle?: ResponsiveValue<CSS.Property.BorderStyle> | undefined;
	/**
	 * The border-top-style CSS property sets the line style of an element's top border.
	 *
	 * [MDN * reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-style)
	 */
	borderTopStyle?: ResponsiveValue<CSS.Property.BorderTopStyle> | undefined;
	/**
	 * The border-bottom-style CSS property sets the line style of an element's bottom border.
	 *
	 * [MDN * reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-style)
	 */
	borderBottomStyle?:
		| ResponsiveValue<CSS.Property.BorderBottomStyle>
		| undefined;
	/**
	 * The border-left-style CSS property sets the line style of an element's left border.
	 *
	 * [MDN * reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-style)
	 */
	borderLeftStyle?: ResponsiveValue<CSS.Property.BorderLeftStyle> | undefined;
	/**
	 * The border-right-style CSS property sets the line style of an element's right border.
	 *
	 * [MDN * reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-style)
	 */
	borderRightStyle?: ResponsiveValue<CSS.Property.BorderRightStyle> | undefined;
}

interface BorderColorProps<
	ThemeType extends Theme = RequiredTheme,
	TVal = ThemeValue<'colors', ThemeType>
> {
	/**
	 * The border-color shorthand CSS property sets the color of all sides of an element's border.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-color)
	 */
	borderColor?: ResponsiveValue<TVal>;
	/**
	 * The border-top-color CSS property sets the color of an element's top border. It can also be set with the shorthand CSS properties border-color or border-top.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-color)
	 */
	borderTopColor?: ResponsiveValue<TVal>;
	/**
	 * The border-bottom-color CSS property sets the color of an element's bottom border. It can also be set with the shorthand CSS properties border-color or border-bottom.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-color)
	 */
	borderBottomColor?: ResponsiveValue<TVal>;
	/**
	 * The border-left-color CSS property sets the color of an element's left border. It can also be set with the shorthand CSS properties border-color or border-left.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-color)
	 */
	borderLeftColor?: ResponsiveValue<TVal>;
	/**
	 * The border-right-color CSS property sets the color of an element's right border. It can also be set with the shorthand CSS properties border-color or border-right.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-color)
	 */
	borderRightColor?: ResponsiveValue<TVal>;
}

interface BorderSidesProps<TVal = CSS.Property.BorderTop<TLengthTamia>> {
	/**
	 * The border-top CSS property is a shorthand that sets the values of border-top-width, border-top-style,
	 * and border-top-color. These properties describe an element's top border.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-top)
	 */
	borderTop?: ResponsiveValue<TVal>;
	/**
	 * The border-right CSS property is a shorthand that sets border-right-width, border-right-style,
	 * and border-right-color. These properties set an element's right border.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-right)
	 */
	borderRight?: ResponsiveValue<TVal>;
	/**
	 * The border-bottom CSS property sets an element's bottom border. It's a shorthand for
	 * border-bottom-width, border-bottom-style and border-bottom-color.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom)
	 */
	borderBottom?: ResponsiveValue<TVal>;
	/**
	 * The border-left CSS property is a shorthand that sets the values of border-left-width,
	 * border-left-style, and border-left-color. These properties describe an element's left border.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-left)
	 */
	borderLeft?: ResponsiveValue<TVal>;
}

interface BorderRadiusProps<
	ThemeType extends Theme = RequiredTheme,
	TVal = ThemeValue<'radii', ThemeType>
> {
	/**
	 * The border-radius CSS property rounds the corners of an element's outer border edge. You can set a single
	 * radius to make circular corners, or two radii to make elliptical corners.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius)
	 */
	borderRadius?: ResponsiveValue<TVal>;
	/**
	 * The border-top-left-radius CSS property rounds the top-left corner of an element.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-left-radius)
	 */
	borderTopLeftRadius?: ResponsiveValue<TVal>;
	/**
	 * The border-top-right-radius CSS property rounds the top-right corner of an element.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-right-radius)
	 */
	borderTopRightRadius?: ResponsiveValue<TVal>;
	/**
	 * The border-bottom-left-radius CSS property rounds the bottom-left corner of an element.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-left-radius)
	 */
	borderBottomLeftRadius?: ResponsiveValue<TVal>;
	/**
	 * The border-bottom-right-radius CSS property rounds the bottom-right corner of an element.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-right-radius)
	 */
	borderBottomRightRadius?: ResponsiveValue<TVal>;
}

interface BorderShorthandProps<TVal = CSS.Property.Border<TLengthTamia>> {
	/**
	 * The border CSS property sets an element's border. It's a shorthand for border-width, border-style,
	 * and border-color.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border)
	 */
	border?: ResponsiveValue<TVal>;
	borderX?: ResponsiveValue<TVal>;
	borderY?: ResponsiveValue<TVal>;
}

export interface BorderProps<ThemeType extends Theme = RequiredTheme>
	extends BorderShorthandProps,
		BorderSidesProps,
		BorderWidthProps<
			ThemeType,
			ThemeValue<'borderWidths', ThemeType> | TLengthTamia
		>,
		BorderColorProps<
			ThemeType,
			ThemeValue<'colors', ThemeType> | CSS.Property.BorderColor
		>,
		BorderStyleProps,
		BorderRadiusProps<ThemeType> {}

interface PositionBasicProps {
	/**
	 * The z-index CSS property sets the z-order of a positioned element and its descendants or
	 * flex items. Overlapping elements with a larger z-index cover those with a smaller one.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index)
	 */
	zIndex?: ResponsiveValue<CSS.Property.ZIndex>;
	/**
	 * The position CSS property specifies how an element is positioned in a document.
	 * The top, right, bottom, and left properties determine the final location of positioned elements.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
	 */
	position?: ResponsiveValue<CSS.Property.Position>;
}

interface PositionsProps<TVal = CSS.Property.Top<TLengthTamia>> {
	/**
	 * The top CSS property participates in specifying the vertical position of a
	 * positioned element. It has no effect on non-positioned elements.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/top)
	 */
	top?: ResponsiveValue<TVal>;
	/**
	 * The right CSS property participates in specifying the horizontal position of a
	 * positioned element. It has no effect on non-positioned elements.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/right)
	 */
	right?: ResponsiveValue<TVal>;
	/**
	 * The bottom CSS property participates in specifying the vertical position of a
	 * positioned element. It has no effect on non-positioned elements.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/top)
	 */
	bottom?: ResponsiveValue<TVal>;
	/**
	 * The left CSS property participates in specifying the horizontal position
	 * of a positioned element. It has no effect on non-positioned elements.
	 *
	 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/left)
	 */
	left?: ResponsiveValue<TVal>;
}

export interface PositionProps extends PositionBasicProps, PositionsProps {}

export interface CoreProps {
	boxSizing?: ResponsiveValue<CSS.Property.BoxSizing>;
}

export interface ExtraProps {
	outline?: ResponsiveValue<CSS.Property.Outline>;
	transition?: ResponsiveValue<CSS.Property.Transition>;
	transitionProperty?: ResponsiveValue<CSS.Property.TransitionProperty>;
	transitionDelay?: ResponsiveValue<CSS.Property.TransitionDelay>;
	transitionDuration?: ResponsiveValue<CSS.Property.TransitionDuration>;
	transitionTimingFunction?: ResponsiveValue<CSS.Property.TransitionTimingFunction>;
	backdropFilter?: ResponsiveValue<CSS.Property.BackdropFilter>;
}

// CSS properties for primitive component props, limited set restricted by theme
export interface RestrictedProps<ThemeType extends Theme = RequiredTheme>
	extends SpaceProps<ThemeType>,
		LayoutProps,
		FlexboxProps,
		GridProps,
		PositionProps,
		CoreProps {}

// All CSS properties for sx prop, support custom values and nesting
export interface AllCSSProps<ThemeType extends Theme = RequiredTheme>
	extends SpaceProps<ThemeType, ThemeValue<'space', ThemeType> | TLengthTamia>,
		ColorProps<ThemeType>,
		TypographyProps<ThemeType>,
		ShadowProps,
		LayoutProps,
		FlexboxProps,
		GridProps,
		BorderProps<ThemeType>,
		BackgroundProps,
		PositionProps,
		CoreProps,
		ExtraProps {}

export type CSSProps<ThemeType extends Theme = RequiredTheme> =
	| AllCSSProps<ThemeType>
	| { [key: string]: AllCSSProps<ThemeType> };
