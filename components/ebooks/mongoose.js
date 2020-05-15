'use strict';

const nav = require('../nav');

module.exports = () => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Mastering Mongoose</title>

    <meta name="description" content="The official Mongoose eBook for developers who need to become Mongoose experts fast.">
    <link rel="stylesheet" href="/assets/style.css" />
    <link rel="stylesheet" href="/assets/ebook.css" />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700|Inconsolata:400,700" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0001, minimum-scale=1.0001, maximum-scale=1.0001, user-scalable=no">
  </head>

  <body>
    ${nav()}
    <div class="hero">
      <div class="overview">
        <h1>Become a Full-Stack Mongoose Expert</h1>
        <div>
          The complete guide to building and maintaining <b>fast, production-ready</b> apps with Mongoose, written by <b>Mongoose's Lead Developer</b>.
        </div>
        <div class="cta">
          <button class="buy">
            Buy the eBook
          </button>
          <br>
          <button class="preview">
            Preview First Chapter
          </button>
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
    </div>
  </body>
</html>
`;