Basic two column layout:

```jsx
import Box from './Box';
<Flex>
  <Box px="m" py="s" bg="hover" width={1 / 2}>
    Foo
  </Box>
  <Box px="m" py="s" bg="primary" width={1 / 2}>
    Bar
  </Box>
</Flex>;
```

Push right:

```jsx
import Box from './Box';
<Flex>
  <Box mr="m">Foo</Box>
  <Box ml="auto">Bar</Box>
</Flex>;
```

Stacking using the Flexbox `gap`/`column-gap`/`row-gap` properties:

```jsx
<Flex gap="l" row-gap="s" flexWrap="wrap">
  <div>eins</div>
  <div>zwei</div>
  <div>polizei</div>
  <div>eins</div>
  <div>zwei</div>
  <div>polizei</div>
  <div>eins</div>
  <div>zwei</div>
  <div>polizei</div>
  <div>eins</div>
  <div>zwei</div>
  <div>polizei</div>
  <div>eins</div>
  <div>zwei</div>
  <div>polizei</div>
</Flex>
```
