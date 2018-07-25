```jsx
<TextContent>
  <h1>Alice’s Adventures in Wonderland</h1>
  <h2>Down the Rabbit-Hole</h2>
  <p>
    Alice was beginning to get <em>very tired</em> of sitting by her
    sister on the bank, and of having nothing to do: once or twice she
    had peeped into the book her sister was reading, but it had no
    pictures or conversations in it, “and what is the use of a book,”
    thought Alice “without pictures or conversation?”
  </p>
  <p>
    So she was considering in her own mind (as well as she could, for
    the hot day made her feel very sleepy and stupid), whether the
    pleasure of making a daisy-chain would be worth the trouble of
    getting up and picking the daisies, when suddenly a{' '}
    <a href="https://en.wikipedia.org/wiki/White_Rabbit">
      White Rabbit
    </a>{' '}
    with pink eyes ran close by her.
  </p>
  <blockquote>
    <p>
      “When you wake up in the morning, Pooh,” said Piglet at last,
      “what’s the first thing you say to yourself?”
    </p>
    <p>
      “What’s for breakfast?” said Pooh. “What do you say, Piglet?”
    </p>
    <p>
      <cite>“The Tao of Pooh” by Benjamin Hoff</cite>
    </p>
  </blockquote>
  <h3>Magical animals</h3>
  <ul>
    <li>Unicorns</li>
    <li>Dragons</li>
    <li>Dogs</li>
  </ul>
  <h3>Todo for today</h3>
  <ol>
    <li>Wake up</li>
    <li>Drink coffee</li>
    <li>Hug a dog</li>
    <li>Go to bed</li>
  </ol>
  <h1>Heading 1</h1>
  <h2>Heading 2</h2>
  <h3>Heading 3</h3>
  <h4>Heading 4</h4>
  <h5>Heading 5</h5>
  <h6>Heading 6</h6>
  <img src="http://morning.photos/photos/medium/2017-09-30-1442-medium.jpg" />
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Breed</th>
        <th>Age</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Dessi</td>
        <td>Dachshund</td>
        <td>1119</td>
      </tr>
      <tr>
        <td>Tsiri</td>
        <td>Saluki</td>
        <td>116</td>
      </tr>
    </tbody>
  </table>
  <p>
    To begin, copy everything from the program below into a text
    editor or into the QBasic <abbr>IDE</abbr> (Integrated Development
    Interface) itself and save it as <code>99BTLS.BAS</code>. Next open
    the file in QBasic and press <kbd>F5</kbd>.
  </p>
  {/* 99 Bottles of Beer on the Wall */}
  {/* Patrick Fleming http://chem-www.mps.ohio-state.edu/~pfleming/ */}
  <pre>
    <code>
      CLS{'\n'}
      {'\n'}n = 100{'\n'}DO UNTIL n = 1{'\n'}
      {'    '}n = n - 1{'\n'}
      {'    '}PRINT n; "bottle";{'\n'}
      {'    '}IF n &lt;&gt; 1 THEN PRINT "s";{'\n'}
      {'    '}PRINT " of beer on the wall . . ."{'\n'}
      {'    '}PRINT n; "bottle";{'\n'}
      {'    '}IF n &lt;&gt; 1 THEN PRINT "s";{'\n'}
      {'    '}PRINT " of beer!"{'\n'}
      {'    '}PRINT "Take one down, pass it around . . ."v
      {'    '}PRINT n - 1; "bottle";{'\n'}
      {'    '}IF n - 1 &lt;&gt; 1 THEN PRINT "s";{'\n'}
      {'    '}PRINT " of beer on the wall!"{'\n'}
      {'    '}PRINT{'\n'}LOOP{'\n'}
      {'\n'}END
    </code>
  </pre>
</TextContent>
```
