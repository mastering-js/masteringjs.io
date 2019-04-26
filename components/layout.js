'use strict';

const nav = require('./nav');

module.exports = params => `
<html>
  <head>
    <title>Mastering JavaScript: ${params.title}</title>

    <link rel="stylesheet" href="/assets/style.css" />
    <link rel="stylesheet" href="/assets/github.css" />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Inconsolata:400,700" rel="stylesheet">
  </head>
  <body>
    ${nav()}
    <div class="content">
      <h1>${params.title}</h1>
      ${params.content}
    </div>
  </body>
</html>
`;