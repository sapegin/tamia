```jsx
import Row from './Row';
<Row>
  <Column width={[1, 1 / 2]}>foo</Column>
  <Column width={[1, 1 / 2]}>bar</Column>
</Row>;
```

```jsx
import Row from './Row';
<Row narrow>
  <Column>foo</Column>
  <Column>bar</Column>
  <Column>baz</Column>
</Row>;
```

```jsx
import Row from './Row';
<Row narrow>
  <Column>foo</Column>
  <Column push="right">bar</Column>
</Row>;
```

```jsx
import Row from './Row';
<Row as="footer">
  <Column width={[1, null, 'auto']} mb="s" align="center">
    © Artem Sapegin, 2018
  </Column>
  <Column
    width={[1, null, 'auto']}
    mb="s"
    push="right"
    align="center"
  >
    Have a nice day!
  </Column>
</Row>;
```
