```jsx
<Heading level={1}>Heading 1</Heading>
<Heading level={2}>Heading 2</Heading>
<Heading level={3}>Heading 3</Heading>
<Heading level={4}>Heading 4</Heading>
<Heading level={5}>Heading 5</Heading>
<Heading level={3} mt="s" mb="m">Heading 3 (with margins)</Heading>
<Heading level={5} as="h1">Heading 5 (h1)</Heading>
```

Actual styles should be defined in a site-specific theme:

```js static
const headingBaseStyles = {
  color: 'base',
  fontFamily: 'heading',
  fontWeight: 'heading',
  lineHeight: 'heading',
  letterSpacing: 'heading',
};
export default {
  headingStyles: {
    1: {
      ...headingBaseStyles,
      fontSize: 'xxl',
    },
    2: {
      ...headingBaseStyles,
      fontSize: 'xl',
    },
    3: {
      ...headingBaseStyles,
      fontSize: 'l',
    },
  },
} as const;
```
