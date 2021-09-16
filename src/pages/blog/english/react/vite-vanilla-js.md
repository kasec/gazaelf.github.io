---
title: Vite Setup with Vanilla JS.
meta:
  - name: description
    content: Let's create a vite setup first with vanilla js(fix in the end).
date: 2020-03-04
---

# Vite Setup with Vanilla JS

## We're going to set up Vite with vanilla JS to know how it works, create function abstractions, dynamic imports, etc.

## Introduction

If it is the first time you hear about [Vite](https://vitejs.dev/), it is a _dev web server_, hence you can run your html files with _hot module loading_, supports `jsx` and `ts` out of the box, also with [Rollup](http://rollupjs.org/guide/en/) integration, so with this tool you can bundle your web projects too.

Now I'm going to begin with a minimal configuration to start with vite environment, just following the next steps.

## Steps to follow.

### Initialize your project.

1. Create our directory `vite-react-twnd`
2. Open your Editor.
3. I will be working with **yarn** instead **npm**, but you can use whatever you want.
4. Initialize your JS application `yarn init`.
5. Install **vite** devDependency `yarn add -D vite`.
6. Add in `package.json` in something similar to this.
   ```json
   "scripts": {
       ...
       "dev": "vite"
   }
   ```

### Add files from scratch without using vite templates.

#### Add the entry file(`index.html`).

```html
<body></body>
<script src="/src/main.jsx"></script>
```

> As you can see _vite_ supports jsx files in browser side, if you don't believe it, try it yourselft without vite.

#### Create `src/main.jsx` file.

```js
const App = `<p>Hello World!!!</p>`;
const add_content_button = document.getElementById("add-content");
const RootElement = document.getElementById("app");

// render element in dom
RootElement.innerHTML = App;
```

#### Create abstraction/function to inject html in element, adding jsdoc.

Now let's create a function that injects content into the DOM element.

```js
// create-element.js
/**
 * @description Remplaza el html de un elemento dato
 * @param element Es un HTMLElement
 * @param content Es un string con/sin html elementos dentro
 */
export default function (currentElement, content) {
  return (currentElement.innerHTML = content);
}
```

As you see in snippet from above, I’ve created a simple function just get two params, a `DOM` element and string content, which will be rendered in DOM element. Also, I’ve added a _JSDOC_ description, now when you try to use this function you will see a popup similar to the below image.

![JS Doc Implementation seeing in action](/assets/images/vite-vanilla-js/js-doc-implementation.png "JS Doc Implementation seeing in action")

#### Following we are going to edit our `main.js` file

```js
import createElement from "./create-element.js";

const App = `<p>Hello World!!!</p>`;
const add_content_button = document.getElementById("add-content");
const RootElement = document.getElementById("app");

createElement(RootElement, App);
```

> If you want to run the above code, it does not works, the reason, regular _script_ does not support imports declarations, try to add `type="module"` in the script tag.
> ![Implementing Importation with script files](/assets/images/vite-vanilla-js/type-module.gif "Implementing importation with script files")

Now our script is cleaner than before. Following I want to introduce with **dynamic imports**, everything what I need will be loaded on demand and not in the beginning, the main advantage of it is that you reduce your initial load.

```js
const App = `<p>Hello World!!!</p>`;
const add_content_button = document.getElementById("add-content");
const RootElement = document.getElementById("app");

add_content_button.addEventListener("click", () => {
  import("./create-element.js").then((response) => {
    response.default(RootElement, App);
  });
});
```

The above modification to `main.js` render the element until the button event is triggered, hence `create-element.js` file is loaded at that moment not before.

## Overview

I see a lot of topics in the post, some are really important in web development, as _function abstractions_ and _dynamic importation_, also we saw how to start with vite and its really fast dev server.
I hope this information was really helpful.
Maybe I'm using some antipatterns if it is the case please contact me(below are my social links).

> Everything here is just personal expererience, if you want to create your own perception about it, I would recommend follow the links what I've post, ask information in forums, blogs and communicate it with us.
