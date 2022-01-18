'use strict';

const nav = require('./nav');

module.exports = () => `
<!DOCTYPE html>

<html lang="en">
<head>
  <title>Hire JavaScript Developers | Mastering JS</title>

  <meta property="og:title" content="Hire JavaScript Developers | Mastering JS" />
  <meta property="og:site_name" content="Mastering JS" />
  <meta property="og:type" content="article" />
  <meta property="og:description" content="Hire the best JavaScript talent in the world on Mastering JS and reach hundreds of thousands of JavaScript developers." />
  <meta name="description" content="Hire the best JavaScript talent in the world on Mastering JS and reach hundreds of thousands of JavaScript developers." />
  <meta name="twitter:image" content="https://masteringjs.io/assets/logo.png">
  <meta property="og:image" content="https://masteringjs.io/assets/logo.png">

  <meta charset="utf-8">
  <meta name="description">
  <meta name="viewport" content="width=device-width, initial-scale=1.0001, minimum-scale=1.0001, maximum-scale=1.0001, user-scalable=no">
  <script src="https://unpkg.com/vue@2.x"></script>
  <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
  <script src="https://js.stripe.com/v3/"></script>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

  <link rel="stylesheet" href="/assets/style.css" />
</head>

<body>
  ${nav()}
  <div id="content"></div>
  <link rel="stylesheet" href="/assets/jobs.css" />
  <link rel="stylesheet" href="/assets/createjob.css" />
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="../src/client/vuecreatejob.js"></script>
</body>
</html>
`
