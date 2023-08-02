'use strict';

const footer = require('./footer');
const list = require('./list');
const nav = require('./nav');

module.exports = ({ posts }) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Mastering JS</title>

    <meta property="og:title" content="Mastering JS" />
    <meta property="og:site_name" content="Mastering JS" />
    <meta property="og:description" content="Bite-sized full stack JavaScript tutorials for pragmatic developers that get things done" />
    <meta name="description" content="Bite-sized full stack JavaScript tutorials for pragmatic developers that get things done">
    <meta name="twitter:image" content="https://masteringjs.io/assets/logo.png">
    <meta property="og:image" content="https://masteringjs.io/assets/logo.png">

    <link rel="stylesheet" href="/assets/style.css" />
    <link rel="stylesheet" href="/assets/home.css" />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Inconsolata:400,700" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0001, minimum-scale=1.0001, maximum-scale=1.0001, user-scalable=no">
  
    <link href="https://masteringjs.io/assets/logo.png" rel="shortcut icon" type="image/x-icon">
    <link href="https://masteringjs.io/assets/logo.png" rel="apple-touch-icon">
  </head>

  <body>
    ${nav()}
    <div class="home">
      <div class="hero">
        <div class="copy">
          <div class="intro">
            Full Stack JavaScript, Explained.
          </div>
          <div class="cta">
            Join our mailing list and get new tutorials delivered
            to your inbox every week.
          </div>
          <div class="button" >
            <a href="https://masteringjs.substack.com/">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="allwrapper">
      <div class="content">
        <h1>What Do You Want to Learn?</h1>
        <div class="pill" style="margin-left: 0px">
          <a href="/fundamentals">Fundamentals</a>
        </div>
        <div class="pill pill-express pill-dark">
          <a href="/express">Express</a>
        </div>
        <div class="pill pill-mongoose pill-dark">
          <a href="/mongoose">Mongoose</a>
        </div>
        <div class="pill pill-vue pill-dark" style="margin-left: 0px">
          <a href="/vue">Vue</a>
        </div>
        <div class="pill pill-axios pill-dark">
          <a href="/axios">Axios</a>
        </div>
        <div class="pill pill-webpack pill-dark">
          <a href="/webpack">Webpack</a>
        </div>
        <div class="pill pill-node pill-dark" style="margin-left: 0px">
          <a href="/node">Node.js</a>
        </div>
        <div class="pill pill-eslint pill-dark">
          <a href="/eslint">ESLint</a>
        </div>
        <div class="pill pill-mocha pill-dark">
          <a href="/mocha">Mocha</a>
        </div>

        <h1>Latest Tutorials</h1>
        ${list({ posts }, 20)}

        <h1>Our Sponsors</h1>

        <div class="row">
          <div class="col-lg-4">
            <a href="https://newcasinouk.com/banking/paypal" rel="sponsored">
              <img src="https://codebarbarian-images.s3.amazonaws.com/paypal-casino.png" alt="PayPal casino" style="max-height: 100px"/>
            </a>
          </div>
          <div class="col-lg-4">
            <a href="https://nuovicasinoitalia.it/casino-stranieri/europa" rel="sponsored">
              <img src="https://codebarbarian-images.s3.amazonaws.com/casino-online-europei.png" alt="casino online europei" style="max-height: 100px"/>
            </a>
          </div>
          <div class="col-lg-4">
            <a href="https://www.correctcasinos.com/fastest-payout-casinos/" rel="sponsored">
              <img src="https://images.opencollective.com/correct-casinos/7cce33a/avatar/256.png" alt="Fast payout casinos" style="max-height: 100px"/>
            </a>
          </div>
          <div class="col-lg-4">
            <a href="https://www.kongcasino.com/" rel="sponsored">
              <img src="https://codebarbarian-images.s3.amazonaws.com/kong-casino.png" alt="casino" style="max-height: 100px"/>
            </a>
          </div>
          <div class="col-lg-4">
            <a href="https://www.wizardslots.com/" rel="sponsored">
              <img src="https://codebarbarian-images.s3.amazonaws.com/wizard-slots.png" alt="slots" style="max-height: 100px"/>
            </a>
          </div>
          <div class="col-lg-4">
            <a href="https://www.kingcasino.com/slots/" rel="sponsored">
              <img src="https://codebarbarian-images.s3.amazonaws.com/king-casino.png" alt="slots" style="max-height: 100px"/>
            </a>
          </div>
        </div>
      </div>
    </div>

    <link rel="stylesheet" href="/assets/footer.css" />
    ${footer()}

    <script async type="text/javascript" src="//cdn.carbonads.com/carbon.js?serve=CE7DLKQY&placement=masteringjsio" id="_carbonads_js"></script>
  </body>
</html>
`;
