Equal width columns (responsive):

```jsx
<Stack minColumnWidth="xxxl">
  <div>foo</div>
  <div>bar</div>
</Stack>
```

Full width on small screens, horizontally stacked on larger screens:

```jsx
<Stack gap="m" justifyContent={[null, 'start']} gridAutoFlow={[null, 'column']}>
  <span>foo</span>
  <span>bar</span>
  <span>baz</span>
</Stack>
```

Responsive footer:

```jsx
<Stack
  as="footer"
  justifyContent={[null, 'space-between']}
  justifyItems={['center', null]}
  gridAutoFlow={[null, 'column']}
>
  <div>
    © Chuck Norris, 2019
  </div>
  <div>
    Have a nice day!
  </div>
</Stack>
```
