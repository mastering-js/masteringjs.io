[Vue CLI](https://cli.vuejs.org/) is a powerful tool for scaffolding new Vue projects with standard tooling, like [Babel](https://babeljs.io/) and [ESLint](https://eslint.org/). To get started, run:

```
npm install @vue/cli
```

Then, run `./node_modules/.bin/vue ui` to get a nice GUI for scaffolding your Vue project. The below video walks through creating a project called `vue-sample` with the basic defaults.

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/2c5169d3b661451b929b66d354b889be" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

To run the project, navigate to the `vue-sample` directory, and run `npm run serve`. Navigate to `localhost:8080` and you'll be able to see your new Vue project:

<img src="https://i.imgur.com/U3pXe4i.png">

This project comes with ESLint, so you can immediately run `npm run lint` to lint your project. The project also has built-in support for single file components and live reload. Open up `src/App.vue` and you should see the below:

<img src="https://i.imgur.com/EOBwXQd.png">

Modify the template to display "Hello, World!":

```
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Hello, World!"/>
  </div>
</template>
```

Once you save, you'll see the app automatically updated in your browser. That's live reloading!

<img src="https://i.imgur.com/ZIMlRsJ.png">
