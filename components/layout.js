'use strict';

const footer = require('./footer');
const nav = require('./nav');

module.exports = params => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>${params.title} - Mastering JS</title>

    <meta property="og:title" content="${params.title}" />
    <meta property="og:site_name" content="Mastering JS" />
    <meta property="og:type" content="article" />
    <meta property="og:description" content="${params.description.replace(/\"/g, '\'')}" />
    <meta name="description" content="${params.description.replace(/\"/g, '\'')}" />
    <meta name="twitter:image" content="https://masteringjs.io/assets/logo.png">
    <meta property="og:image" content="https://masteringjs.io/assets/logo.png">

    <meta name="viewport" content="width=device-width, initial-scale=1.0001, minimum-scale=1.0001, maximum-scale=1.0001, user-scalable=no">

    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Consolas:400,700" rel="stylesheet">
    <link href="https://masteringjs.io/assets/logo.png" rel="shortcut icon" type="image/x-icon">
    <link href="https://masteringjs.io/assets/logo.png" rel="apple-touch-icon">

    <link rel="stylesheet" href="/assets/style.css" />
    <link rel="stylesheet" href="/assets/github.css" />
    <script src="//m.servedby-buysellads.com/monetization.js" type="text/javascript"></script>
  </head>
  <body>
    <div class="allwrapper">
      ${nav()}
      <div class="content">
        ${params.content}
      </div>
      ${footer()}
      ${floatAd(params.ad)}
    </div>
    <script async type="text/javascript" src="//cdn.carbonads.com/carbon.js?serve=CE7DLKQY&placement=masteringjsio" id="_carbonads_js"></script>
  </body>
</html>
`;

function floatAd(ad) {
  if (!ad) {
    return '';
  }
  return `
  <div class="ad-right">
    ${ad}
  </div>
  `;
}
