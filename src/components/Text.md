```jsx
<Text>Default (base) style text</Text>
<Text variant="base">Base style text</Text>
<Text textAlign="right">Right aligned text</Text>
<Text mx="m" my="s">Text with margins</Text>
```

Actual styles should be defined in a site-specific theme:

```js static
const textBaseStyles = {
  color: 'base',
  fontFamily: 'base',
  fontWeight: 'base',
  lineHeight: 'base',
  letterSpacing: 'base',
};
export default {
  textStyles: {
    base: {
      ...textBaseStyles,
    },
    large: {
      ...textBaseStyles,
      fontSize: 'l',
    }
  },
} as const;
```

And then you could use them like this:

```jsx static
<Text variant="large">Large text</Text>
```
