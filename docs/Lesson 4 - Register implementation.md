# Lesson 4 - Register implementation

In this lesson we will learn how work with Pinia to manage state and values used for form, how to send a request to server using Axios library when user submits the form and read the response from the server.

First we need to install Axios library for requests to API:

```shell
npm install axios --save
```

Then create a new file `src/bootstrap.js` with following content:

```js
import axios from "axios";

window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.defaults.withCredentials = true;
window.axios.defaults.baseURL = "http://parkingapi.test/api/v1";
```

We set `X-Requested-With` header to tell server it is XHR request, and it serves additional purpose so the server must consent to CORS policies.

Option `window.axios.defaults.withCredentials = true;` tells axios library to send the cookies along the request.

Convenience option is `window.axios.defaults.baseURL = "http://parkingapi.test/api/v1";` so we can omit full urls in our requests and just type in relative path of the server's API endpoint.

After that we need import `src/bootstrap.js` file into `src/main.js` , this can be seen on the first line:

```js
import "@/bootstrap.js";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
```

Now we have setup for making requests to API. Now it is time to implement our store. Create a new `src/stores/register.js` file as follows:

```js
import { reactive } from "vue";
import { defineStore } from "pinia";

export const useRegister = defineStore("register", () => {
  const form = reactive({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  function resetForm() {
    form.name = "";
    form.email = "";
    form.password = "";
    form.password_confirmation = "";
  }

  async function handleSubmit() {
    return window.axios.post("auth/register", form).then((response) => {
      console.log(response.data);
    });
  }

  return { form, resetForm, handleSubmit };
});
```

We define reactive object `form` with the `reactive()` function. Object contains keys we are going to use on register page, these values will update automatically when value of the input field changes.

> Reactive objects are JavaScript Proxies and behave just like normal objects. The difference is that Vue is able to track the property access and mutations of a reactive object. Read more on [reactivity fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#declaring-reactive-state). If you're curious about the details or not familiar with reactivity it is explained in official Vue guide [reactivity in depth](https://vuejs.org/guide/extras/reactivity-in-depth.html).

Method `resetForm()` will be used to clear all form fields when `RegisterView` component is unmounted, because state is persistent across the application.

Method `handleSubmit()` makes a request to the server, and prints response to console, in future lessons we will change that to save the returned token from the response and redirect user to logged in area. As we can see for axios `post` method we define relative url, because `baseURL` option was added earlier.

Time to update our `src/views/Auth/RegisterView.vue`:

```vue
<script setup>
import { onBeforeUnmount } from "vue";
import { useRegister } from "@/stores/register";

const store = useRegister();

onBeforeUnmount(store.resetForm);
</script>

<template>
  <form @submit.prevent="store.handleSubmit" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
	  <h1 class="text-2xl font-bold mb-4 text-center">Register</h1>
      <div class="flex flex-col gap-2 mb-4">
        <label for="name" class="required">Name</label>
        <input
          v-model="store.form.name"
          id="name"
          name="name"
          type="text"
          class="form-input"
          autocomplete="name"
          required
        />
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <label for="email" class="required">Email</label>
        <input
          v-model="store.form.email"
          id="email"
          name="email"
          type="email"
          class="form-input"
          autocomplete="email"
          required
        />
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <label for="password" class="required">Password</label>
        <input
          v-model="store.form.password"
          id="password"
          name="password"
          type="password"
          class="form-input"
          autocomplete="new-password"
          required
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="password_confirmation" class="required">
	      Confirm password
	    </label>
        <input
          v-model="store.form.password_confirmation"
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          class="form-input"
          autocomplete="new-password"
          required
        />
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <div class="flex flex-col gap-2">
        <button type="submit" class="btn btn-primary">Register</button>
      </div>
    </div>
  </form>
</template>
```

Whole new section was added to the our register component:

```vue
<script setup>
import { onBeforeUnmount } from "vue";
import { useRegister } from "@/stores/register";

const store = useRegister();

onBeforeUnmount(store.resetForm);
</script>
```

To make our store available first we import `useRegister` function from store we defined and then assignint it to a constant `const store = useRegister();`

`onBeforeUnmount` - registers a hook to be called right before a component instance is to be unmounted accepts another function as a parameter. Notice `store.resetForm` is passed which is a function reference as opposed to `store.resetForm()` which would be immediate function call.

Values from the store to input fields are bound using `v-model` directive, for example: `<input v-model="store.form.email" />`. All form input fields now have `v-model` directive with corresponding values.

Empty function on form submit gets replaced with `store.handleSubmit`: `<form @submit.prevent="store.handleSubmit" novalidate>`. It is called when form gets submitted.

After submitting the form the following output can be seen in console:

```js
Object { access_token: "118|CJv0t9yHJcPFsifkXyoMaiCJBpRyrmsXYDLENyAN" }
```

This means everything went right and user was registered, later we will cover that but one thing at a time. Yet we still have another thing missing. What if we press button again? Oh no, we got an error in the console:

![Register fail](assets/register-fail.png)

Let's inpect the network tab on browser's dev tolls:

![network-422](assets/network-422.png)

Server denied our request with 422 Unprocessable Entity response code, this means that we have some sort of data validation error. We tried to register another user with same credentials and user doesn't even know why this happened in the first place.

Let's move to another lesson and handle form validation.
