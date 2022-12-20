Basic two column layout:

```jsx
import Box from './Box';
<Flex>
  <Box px="m" py="s" width={1 / 2} sx={{ bg: 'hover' }}>
    Foo
  </Box>
  <Box px="m" py="s" width={1 / 2} sx={{ bg: 'primary' }}>
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
<Flex gap="l" rowGap="s" flexWrap="wrap">
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
