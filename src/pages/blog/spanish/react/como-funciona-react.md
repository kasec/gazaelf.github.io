---
title: Como funciona react por detras, aqui te lo explicamos.
meta:
  - name: description
    content: En este blog hablare sobre como funciona React, asi algunos trucos para "salvar" performance, por que renderean todos los elementos?, como evitarlo, asi como algunas cosas de useMemo y useCallback (memoization)
date: 2020-09-02
---

# Como funciona exactamente React

## Como hace **React** para renderear sus componentes asi como tambien como utilizar `useCallback` y `useMemo`

> **Para comprender este blog**, doy por hecho ya que tienes un conocimiento minimo sobre el api de React.

## Overview

Como _React_ es aparemente muy rapido, **_re-renderea_** los componentes hijos cada vez que una accion en especifico es disparada.

Enseguida mostrare unas piezas de codigo, no te preocupes si no entiendes, tratare de explicarlo sobre la marcha.

```jsx
// components/count-button.jsx
const CountButton = function CountButton({ onClick, count, id }: any) {
  console.log("Rendering [CountButton] with [id] ::", id);

  useEffect(() => {
    console.log("[count]", id);
  }, [count]);

  useEffect(() => {
    console.log("[onClick]", id);
  }, [onClick]);

  return (
    <div>
      <span>id {id}</span>
      <button onClick={onClick}>{count.value}</button>
    </div>
  );
};
```

<br/>

```jsx
// App.jsx
function App() {
  console.log("Rendering [App]");

  const [count1, setCount1] = React.useState({
    value: 0,
  });

  const increment1 = () =>
    setCount1((c) => ({
      value: c.value + 1,
    }));

  const [count2, setCount2] = React.useState({
    value: 0,
  });

  const increment2 = () =>
    setCount2((c) => ({
      value: c.value + 1,
    }));

  return (
    <>
      <CountButton id={1} count={count1} onClick={increment1} />
      <CountButton id={2} count={count2} onClick={increment2} />
    </>
  );
}
```

Cuantos **logs** seran mostrados en tus _`devtools`_ cada vez que presiones un boton?

### SPOILERS!!

Cada vez que presionas un boton el contador se actualiza, supongo que esto es normal para ti, ademas de eso los componentes que no tienen ninguna dependencia son alterados y vuelven a renderearse.

Ejemplo: Si das clic al button 1 los logs que se mostraran seran los siguientes:

```output
Rendering [App]
Rendering [CountButton] with [id] :: 1
Rendering [CountButton] with [id] :: 2

[onClick] 1
[onClick] 2

[count] 1
```

Despues de ver el output de arriba surgen varias preguntas.

Como mencione arriba, React renderea todos los componentes hijos sin importar que estos no tengan ninguna **_dependencia/prop_** directa del padre, esto no sabemos por que lo hace React pero debe de tener alguna razon.

Algunos autores mencionan que no hay ninguna razon para temerle a esto ya que React es sumamente _rapido_, para que esto cause algun problema.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I rarely use these React performance features:<br><br>React.memo<br>useCallback<br>useMemo<br><br>If I have a performance issue, I usually find I made a mistake or am using a component that merely needs optimized.<a href="https://twitter.com/hashtag/react?src=hash&amp;ref_src=twsrc%5Etfw">#react</a></p>&mdash; Cory House (@housecor) <a href="https://twitter.com/housecor/status/1358791451665178634?ref_src=twsrc%5Etfw">February 8, 2021</a></blockquote>

> Si gustas puedes leer el [post de Kent](https://kentcdodds.com/blog/usememo-and-usecallback), para conocer mas del tema.

Quedan 2 preguntas por resolver.

1. Se puede evitar la renderizacion de elementos no dependientes?
2. Porque el `onClick` _prop_ lo marca como que esta cambiando el valor?

## Se puede evitar la renderizacion de elementos no dependientes?

La respuesta a esto es **SI**, si se puede, en seguida muestro como.
`

```jsx
// components/count-button.jsx
const CountButton = React.memo(function CountButton({
  onClick,
  count,
  id,
}: any) {
  console.log("Rendering [CountButton] with [id] ::", id);

  useEffect(() => {
    console.log("[count]", id);
  }, [count]);

  useEffect(() => {
    console.log("[onClick]", id);
  }, [onClick]);

  return (
    <div>
      <span>id {id}</span>
      <button onClick={onClick}>{count.value}</button>
    </div>
  );
});
```

Notas la diferencia en el codigo de arriba?

[React.memo](https://reactjs.org/docs/react-api.html#reactmemo), es un **_high order component_**, el cual envuelve tu componente y [memoriza](https://en.wikipedia.org/wiki/Memoization) tu componente lo cual permite que no este cambiando/rendereando cada vez que el padre dispara un evento, sino solo si sus props cambian.

Aunque con esto no es suficiente ya que el `onClick` prop siempre esta cambiando, esto nos lleva a la siguiente pregunta.

## Porque el `onClick` _prop_ lo marca como que esta cambiando el valor?

La respuesta es simple, veamos el codigo de `App.jsx` otra vez.

```jsx
// App.jsx
function App() {
  console.log("Rendering [App]");

  const [count1, setCount1] = React.useState({
    value: 0,
  });

  const increment1 = () =>
    setCount1((c) => ({
      value: c.value + 1,
    }));

  const [count2, setCount2] = React.useState({
    value: 0,
  });

  const increment2 = () =>
    setCount2((c) => ({
      value: c.value + 1,
    }));

  return (
    <>
      <CountButton id={1} count={count1} onClick={increment1} />
      <CountButton id={2} count={count2} onClick={increment2} />
    </>
  );
}
```

El detalle aqui es que a diferencia de los [valores primitivos](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) las funciones son guardadas por referencia, y como sabemos cuando un evento es disparado se renderean todos los componentes.

`increment1` y `increment2` al momento que el componente padre vuelve a renderizarse obtienen otro valor, aunque sea el mismo lo guardan en otra referencia, y dentro de los componentes `CountButton`, obtienen el valor de dicha (nueva)referencia y por el `useEffect` lo detecta como nuevo.

Ahora que ya sabemos que es lo que causa la renderizacion aun teniendo `React.memo` podemos tomar cartas en el asunto para evitar el cambio del valor de `increment1` y `increment2`

Lo que usaremos a continuacion para que no cambie el datos sera memoization lo cual usamos arriba.

React tiene dos hooks que podemos utilizar aqui `useMemo` y `useCallback`, en este caso usaremos `useCallback`. Estos hooks los que hacen principalmente es _memorizar_ el valor y no lo cambian siempre y cuando alguna dependencia como tal cambie, esto evita que _computaciones complejas se esten ejecutando en cada renderizacion_. En este caso nosotros la utilizaremos para que nuestros componentes hijos se rendericen cuando sea nesesario.

```jsx
// App.jsx
function App() {
	const [count1, setCount1] = React.useState(...)
	const [count2, setCount2] = React.useState(...)

	const increment1 = React.useCallback(() => setCount1(
		c => ({
			value: c.value + 1
		})
	), [])


	const increment2 = React.useCallback(() => setCount2(
		c => ({
			value: c.value + 1
		})
	), [])

	return (
		<>
			...
		</>
	)
}
```

Lo unico que hicimos arriba fue envolver nuestras funciones en el hook de React, ahora cuando presiones un boton **1** solo mostrara los siguientes logs:

```output
Rendering [App]
Rendering [CountButton] with [id] :: 1

[count] 1
```

# Resumen

Que es lo que vimos?

- Como Funciona React.
- [Como crear un component puro](https://reactjs.org/docs/react-api.html#reactpurecomponent).
- Como funcionan las funciones en js.
- Memoization.
- `useCallback` React Hook.

# Bonus

Si llegaste hasta aqui, gracias por leer este post, espero y te haya resultado de bastante ayuda.

Igual si tienes alguna observacion y/o duda puedes contactarme en alguna de mis redes sociales, que estan abajo(solo dale clic/tap al footer), me gustaria saber que piensas que y con gusto cuando tenga tiempo te respondere.
