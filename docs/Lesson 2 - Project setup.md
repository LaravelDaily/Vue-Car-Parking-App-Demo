# Lesson 2 - Project setup

Now we have a default app with basic counter implementation to see how state management and other things work in Vue. We don't need these things in scaffolding for our application and maybe it will be a good idea to use TailwindCSS for our styles to have a bit of convenience.

1. Remove unnecessary files

This is the list of files we won't need in our project, you can delete them:

```
deleted:    src/assets/base.css
deleted:    src/assets/logo.svg
deleted:    src/components/HelloWorld.vue
deleted:    src/components/TheWelcome.vue
deleted:    src/components/WelcomeItem.vue
deleted:    src/components/icons/IconCommunity.vue
deleted:    src/components/icons/IconDocumentation.vue
deleted:    src/components/icons/IconEcosystem.vue
deleted:    src/components/icons/IconSupport.vue
deleted:    src/components/icons/IconTooling.vue
deleted:    src/stores/counter.js
deleted:    src/views/AboutView.vue
```

2. Update existing files

After removing files not needed we also need to update existing ones to get rid of any dead references and remove CSS from them.

Update `src/App.vue` to:

```vue
<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
```

Remove all contents from `src/assets/main.css` but keep the file.

Update `src/router/index.js` to:

```js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import('../views/HomeView.vue'),
    },
  ],
})

export default router
```

Update `src/views/HomeView.vue` to:

```vue
<template>Home view</template>
```

3. After we got rid of all the junk, we can run a linter to keep all existing files in a consistent format. This step is not always necessary. Depending on your setup this command is run automatically by your IDE or editor on file each time you save it.

```shell
npm run lint
```

4. Install Tailwind CSS

Installing Tailwind CSS as a PostCSS plugin is the most seamless way to integrate it with build tools like webpack, Rollup, Vite, and Parcel.

Install `tailwindcss` and its peer dependencies via npm, and create your `tailwind.config.js` file.

```shell
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

Update `tailwind.config.js` in your project root to:

```js
/* eslint-env node */
/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{vue,js}"],
  theme: {
    extend: { colors },
  },
  plugins: [],
};
```

- added `/* eslint-env node */` to first line. This specifies that this file should run in Node environment otherwise linter would complain that `module` is not defined.
- importing all colors, so any setting will work out of the box to play around
- and added `"./src/**/*.{vue,js}"` value to the content key so Tailwind will look at all Vue and js files for classes to compile in the src folder.

Create `postcss.config.js` in your project root directory with the following content:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

Update `src/assets/main.css` to:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
