'use strict';

const footer = require('./footer');
const nav = require('./nav');

module.exports = params => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-8M7D4R7TYY"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'G-8M7D4R7TYY');
    </script>
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
  </head>
  <body>
    <div class="allwrapper">
      ${nav()}
      <div class="content">
        ${params.content}
      </div>
      <link rel="stylesheet" href="/assets/footer.css" />
      ${footer()}
      ${floatAd(params.ad)}
    </div>
    ${carbonAdScript(params.carbonAds)}
  </body>
</html>
`;

function carbonAdScript(carbonAds) {
  if (carbonAds === false) {
    return '';
  }

  return '<script async type="text/javascript" src="//cdn.carbonads.com/carbon.js?serve=CE7DLKQY&placement=masteringjsio" id="_carbonads_js"></script>';
}

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
