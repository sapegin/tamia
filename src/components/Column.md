```jsx
<Row>
  <Column width={[1, 1 / 2]}>foo</Column>
  <Column width={[1, 1 / 2]}>bar</Column>
</Row>
```

```jsx
<Row narrow>
  <Column>foo</Column>
  <Column push="right">bar</Column>
</Row>
```

```jsx
<Row is="footer">
  <Column width={[1, null, 'auto']} mb="s" align="center">
      © Artem Sapegin, 2018
  </Column>
  <Column width={[1, null, 'auto']} mb="s" push="right" align="center">
      Have a nice day!
  </Column>
</Row>
```
