---
title: Creating our custom hook.
meta:
  - name: description
    content: WIP - We're going to build a hook with vue and use it in every place of your project, integrated with a error message component.
date: 2021-05-04
status: WIP
---

# Creating our custom hook

> We're going to build a hook with vue and use it in every place of your project, integrated with a error message component.

```tsx
import { ref } from "vue";

const defaultMessage = "Insert error message";
const hasError = ref(false);
const message = ref(defaultMessage);

const throwError = (_message: string, timeDelay: number = 5000) => {
  hasError.value = true;
  message.value = typeof _message === "string" ? _message : defaultMessage;
  setTimeout(closeError, timeDelay);
};

const closeError = () => (hasError.value = false);
// when you set your hook you can set the the default message,
// but in each page where you set it could has side effects,
// so you need to create a usehook factory to create an instance and every
// view of the project use the same instance.
export default function useError() {
  return { throwError, hasError, closeError, message };
}
```
