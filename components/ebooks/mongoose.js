'use strict';

const config = require('../../config');
const footer = require('../footer');
const nav = require('../nav');

module.exports = ({ paypalButton, promoPrice, defaultPrice }) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Mastering Mongoose</title>

    <meta name="description" content="The official Mongoose eBook for developers who need to become Mongoose experts fast.">
    <link rel="stylesheet" href="/assets/style.css" />
    <link rel="stylesheet" href="/assets/ebook.css" />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700|Inconsolata:400,700" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0001, minimum-scale=1.0001, maximum-scale=1.0001, user-scalable=no">
    <meta name="twitter:card" content="summary_large_image"></meta>
    <meta name="twitter:title" content="Mastering Mongoose"></meta>
    <meta name="twitter:description" content="The official Mongoose eBook for developers who need to become Mongoose experts fast."></meta>
    <meta name="twitter:image" content="https://mastering-mongoose.netlify.app/images/mastering-mongoose.jpg" />
    <meta property="og:image" content="https://mastering-mongoose.netlify.app/images/mastering-mongoose.jpg" />
  
    <script src="https://js.stripe.com/v3/"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  </head>

  <body>
    ${nav()}
    <div class="sticky-promo">
      <div class="cover">
        <img src="https://mastering-mongoose.netlify.app/images/mastering-mongoose.jpg">
      </div>
      <div class="cta">
        <a href="#purchase">
          <h3>I'm in! &#x21B4;</h3>
          <div>Go to buying options</div>
        </a>
      </div>
    </div>
    <div class="sticky-promo-mobile">
      <a href="#purchase">
        <img src="https://mastering-mongoose.netlify.app/images/mastering-mongoose.jpg">
        <div>Buying Options &#x21B4;</div>
      </a>
    </div>
    <div class="hero">
      <div class="overview">
        <h1>Become a Full-Stack Mongoose Expert</h1>
        <div class="tagline">
          The complete guide to building and maintaining <b>fast, production-ready</b> apps with Mongoose, written by <b>Mongoose's Lead Developer</b>.
        </div>
        <div class="cta">
          <a href="#purchase">
            <button class="buy">
              Buy the eBook
            </button>
          </a>
          <br>
          <a href="https://masteringmongoose.com">
            <button class="preview">
              Preview
            </button>
          </a>
        </div>

        <div class="cover-mobile">
          <img src="https://mastering-mongoose.netlify.app/images/mastering-mongoose.jpg">
        </div>
      </div>
      <div class="cover">
        <img src="https://mastering-mongoose.netlify.app/images/mastering-mongoose.jpg">
      </div>
      <div style="clear: both"></div>
    </div>
    <div class="section">
      <h2>Full-Stack Node.js and MongoDB, Explained</h2>
      <p>
        Let's face it, building APIs can be a real pain in the backend.
        You as an API architect are responsible for shipping new features
        while maintaining data integrity, security, developer experience,
        and performance. Imagine yourself being confident you can
        deliver all this and more.
      </p>
      <p>
        <a href="https://mongoosejs.com/">Mongoose</a> is the most
        popular Node.js database framework. Over 1 million GitHub projects
        depend on Mongoose, ranging from student projects to startups
        to Fortune 500 companies.
      </p>
      <p>
        <i>Mastering Mongoose</i> will teach you the guiding principles
        for building <b>production-ready</b> APIs and backend services
        with Node.js and MongoDB. You'll learn:
      </p>
      <ul>
        <li>
          The relationships between the 5 fundamental Mongoose classes: Model,
          Document, Schema, Connection, and Query
        </li>
        <li>
          The 3 schema design principles for ensuring consistent performance
          as your collections grow beyond 100k documents
        </li>
        <li>
          The 4 different types of Mongoose middleware, and how to use them
        </li>
        <li>
          How to integrate Mongoose with Express to build HTTP APIs
        </li>
        <li>
          How to integrate Mongoose with Websockets to build realtime apps
        </li>
      </ul>
      <p>
        <i>Mastering Mongoose</i> packs all this and more into a concise 153
        pages. That means you can become a Mongoose expert in days, not months.
        Stop copy/pasting snippets from StackOverflow and become the backend
        expert your team relies on.
      </p>
    </div>
    <div class="section author">
      <h2>Meet the Author: Valeri Karpov</h2>
      <div class="author-pic">
        <img src="/assets/images/val.jpg" />
      </div>
      <div class="author-bio">
        <p>
          Hi, I'm Val. I'm a full stack JavaScript developer based in Miami, FL.
          I've been the maintainer of Mongoose since April 2014, and I've
          been building apps using Mongoose since 2012. 
        </p>
        <p>
          In <i>Mastering Mongoose</i>, I've distilled 8 years of experience
          building Mongoose apps into a few hours of reading. This eBook isn't
          a full Mongoose reference. It's a carefully curated guide explaining
          the lessons I've learned building Mongoose apps with dozens of contributors
          and hundreds of millions of documents.
        </p>
        <p>
          I'm the author of <a href="https://asyncawait.net/"><i>Mastering Async/Await</i></a>,
          <a href="http://es2015generators.com/"><i>The 80/20 Guide to ES2015 Generators</i></a>,
          and <a href="https://www.amazon.com/Professional-AngularJS-Valeri-Karpov/dp/1118832078/ref=sr_1_1?ie=UTF8&qid=1528769632&sr=8-1&keywords=professional+angularjs"><i>Professional AngularJS</i></a>.
          I've also written dozens of Mongoose tutorials on <a href="https://thecodebarbarian.com/tag/mongodb.html">my blog</a>. 
        </p>
      </div>
      <div style="clear: both"></div>
    </div>
    <div class="section">
      <h2>Sample Apps</h2>
      <p>
        <i>Mastering Mongoose</i> comes with 4 sample apps built to demonstrate
        the eBook's lessons. These apps include:
      </p>
      <div class="sample-app">
        <h3>Realtime Websocket Chat</h3>
        <div class="app-preview">
          <img src="/assets/images/ebooks/websocket-chat.png">
        </div>
        <div class="description">
          <p>
            A chat app built with vanilla JS on the frontend. Chat
            messages are sent in realtime using websockets.
          </p>
          <p>
            The backend is powered by Express and <a href="https://www.npmjs.com/package/ws">ws</a>.
            The app demonstrates how to use the same port for both HTTP
            and websockets, as well as how to integrate Mongoose with
            websockets.
          </p>
        </div>
        <div style="clear: both"></div>
      </div>
      <div class="sample-app">
        <h3>React Shopping Cart</h3>
        <div class="app-preview">
          <img src="/assets/images/ebooks/react-music-shop.png">
        </div>
        <div class="description">
          <p>
            A sample music shop built with React. Includes test payment
            integration with <a href="https://stripe.com/>Stripe</a>
            and end-to-end tests powered by <a href="http://thecodebarbarian.com/control-chrome-from-node-js-with-puppeteer.html">Puppeteer</a>.
          </p>
          <p>
            The backend is built with Express. This app demonstrates
            how to manage a shopping cart with Express and Mongoose,
            including how to check out with Stripe.
          </p>
        </div>
        <div style="clear: both"></div>
      </div>
      <div class="sample-app">
        <h3>Vue Stock Portfolio</h3>
        <div class="app-preview">
          <img src="/assets/images/ebooks/vue-stock-portfolio.png">
        </div>
        <div class="description">
          <p>
            A Vue app that calculates the total value of your stock
            portfolio. Includes server-side rendering
            and end-to-end tests powered by <a href="http://thecodebarbarian.com/control-chrome-from-node-js-with-puppeteer.html">Puppeteer</a>.
          </p>
          <p>
            The Express-based backend demonstrates how to handle
            pre-fetching data for server-side rendering.
          </p>
        </div>
        <div style="clear: both"></div>
      </div>
    </div>
    <div class="section" id="purchase">
      <h2>Buy the eBook Today</h2>
      <div class="cover">
        <img src="/assets/images/ebooks/mongoose-preview.jpg">
      </div>
      <div class="details">
        <h3>What's Inside</h3>
        <ul>
          <li>PDF and ePub</li>
          <li>Link to online HTML version</li>
          <li>Access to sample app GitHub repo</li>
        </ul>
        <div class="price">
          ${_displayPrice(promoPrice, defaultPrice)}
        </div>
        <div class="paypal-button buy" style="cursor: pointer" onclick="stripeCheckout()">
          Buy Now
        </div>
        <div class="small">
          Have an issue? <a href="https://github.com/vkarpov15/masteringjs.io/issues">Report it on GitHub</a> and we'll respond within 24 hours.
        </div>
        <div class="small">
          Not happy with your purchase?
          <a href="mailto:val@karpov.io">Email val@karpov.io</a> with your transaction id for a full refund.
        </div>
      </div>
      <div style="clear: both"></div>
    </div>

    <link rel="stylesheet" href="/assets/footer.css" />
    ${footer()}

    <script type="text/javascript">
      var stripeKey = '${config.stripePublicKey}';
      var stripe = Stripe(stripeKey);
      var server = window.location.hostname === 'localhost' ?
        'http://localhost:7071' :
        'https://masteringjs-job-board.azurewebsites.net';
      var status = 'init';

      function stripeCheckout() {
        if (status !== 'init') {
          return;
        }
        document.querySelector('.paypal-button').innerHTML = 'Checking Out...';
        axios.post(server + '/api/createEbookCheckout', { itemNumber: '0002' }).then(function(response) {
          document.querySelector('.paypal-button').innerHTML = 'Buy Now';
          status = 'paid';
          return stripe.redirectToCheckout({ sessionId: response.data.id });
        }).catch(() => {
          document.querySelector('.paypal-button').innerHTML = 'Buy Now';
          status = 'init';
        });
      }

      window.addEventListener('scroll', function() {
        var diff = document.querySelector('#purchase').getBoundingClientRect().top - window.innerHeight;

        if (diff <= -50) {
          document.querySelector('.sticky-promo').classList.add('hide');
          document.querySelector('.sticky-promo-mobile').classList.add('hide');
        } else {
          document.querySelector('.sticky-promo').classList.remove('hide');
          document.querySelector('.sticky-promo-mobile').classList.remove('hide');
        }
      });
    </script>
  </body>
</html>
`;

function _displayPrice(promoPrice, defaultPrice) {
  if (promoPrice == null) {
    return `<b>$${defaultPrice}</b>`;
  }
  return `<strike>$${defaultPrice}</strike> <b>$${promoPrice}</b>`;
}
