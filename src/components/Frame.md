```jsx
import Grid from './Grid';
<Grid
  gridTemplateColumns="repeat(auto-fit, minmax(200px,1fr))"
  gridGap="m"
  alignItems="flex-start"
>
  <Frame ratio={1} sx={{ bg: 'hover' }}>
    <img
      src="https://source.unsplash.com/user/sapegin/800x600"
      alt="Some random photo"
    />
  </Frame>
  <Frame ratio={6 / 9} sx={{ bg: 'hover' }}>
    Pizza!
  </Frame>
</Grid>;
```
