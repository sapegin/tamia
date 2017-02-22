import s from './Main.pcss';

/*
Main content container that pushes footer to the bottom of the page:

  <header />
  <Main>Hello world!</Main>
  <footer />
 */
export default function(props, children) {
	return (
		<main class={s.main}>
			{children}
		</main>
	);
}
