```js static
const Tomato = styled(Base)`
  color: tomato;
`;
Tomato.defaultProps = {
  as: 'div'
};

<Tomato as="p">🍅</Tomato>;
```
