'use strict';

const list = require('./list');
const nav = require('./nav');

module.exports = ({ posts }) => `
<html>
  <head>
    <title>Mastering JS</title>

    <meta name="description" content="Bite-sized full stack JavaScript tutorials for busy developers">
    <link rel="stylesheet" href="/assets/style.css" />
    <link rel="stylesheet" href="/assets/home.css" />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Inconsolata:400,700" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0001, minimum-scale=1.0001, maximum-scale=1.0001, user-scalable=no">
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
            <a href="https://www.getrevue.co/profile/masteringjs">
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

        <h1>Latest Tutorials</h1>
        ${list({ posts }, 20)}
      </div>
    </div>

    <script async type="text/javascript" src="//cdn.carbonads.com/carbon.js?serve=CE7DLKQY&placement=masteringjsio" id="_carbonads_js"></script>
  </body>
</html>
`;
