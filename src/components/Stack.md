Vertical stack (default):

```jsx
<Stack gap="l">
  <div>eins</div>
  <div>zwei</div>
  <div>polizei</div>
</Stack>
```

Horizontal stack:

```jsx
<Stack gap="l" direction="row">
  <div>eins</div>
  <div>zwei</div>
  <div>polizei</div>
</Stack>
```

Responsive gap:

```jsx
<Stack gap={['s', 'l']}>
  <div>eins</div>
  <div>zwei</div>
  <div>polizei</div>
</Stack>
```

Responsive direction:

```jsx
<Stack gap="l" direction={['column', 'row']}>
  <div>eins</div>
  <div>zwei</div>
  <div>polizei</div>
</Stack>
```

Realistic responsive example:

```jsx
import Text from './Text';
<Stack
  gap="m"
  justifyContent="space-between"
  alignItems="flex-start"
  direction={['column', 'row']}
>
  <Text fontWeight="bold">
    Sign in today to get the best deals!
    <br />
    Just one click away!!
  </Text>
  <button>Sign in</button>
</Stack>;
```
