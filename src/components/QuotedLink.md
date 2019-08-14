Regular link:

```jsx
<QuotedLink href="https://sapegin.me/">
  »<u>Doppelgänger</u>«
</QuotedLink>
```

As a button:

```jsx
<QuotedLink as="button" onClick={() => console.log('Click!')}>
  “<u>Drink me</u>”
</QuotedLink>
```

With an image:

```jsx
import Box from './Box';
import Flex from './Flex';
<QuotedLink href="https://sapegin.me/">
  <Flex>
    <Box mr="s">
      <img src="https://source.unsplash.com/user/sapegin/200x200" alt="" />
    </Box>
    <u>Drink me</u>
  </Flex>
</QuotedLink>
```
