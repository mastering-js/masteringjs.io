[Puppeteer](https://www.npmjs.com/package/puppeteer) is Google's officially
supported library for controlling Chrome from Node.js. You can open
Chrome from Node.js, navigate to Google, search for something, and
see the results. Or you can run Puppeteer in [headless mode](https://github.com/puppeteer/puppeteer#default-runtime-settings) and make it run in the background.

For example, here's how you can make Chrome load Google's home page
using Puppeteer and Node.js:

```javascript
const puppeteer = require('puppeteer');

run().then(() => console.log('Done')).catch(error => console.log(error));

async function run() {
  // Setting `headless: false` opens up a browser
  // window so you can watch what happens.
  const browser = await puppeteer.launch({ headless: false });

  // Open a new page and navigate to google.com
  const page = await browser.newPage();
  await page.goto('https://google.com');

  // Wait 5 seconds
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Close the browser and exit the script
  await browser.close();
}
```

The output looks like this:

<img src="https://i.imgur.com/yUNM9fc.png" class="inline-image" style="width: 100%">

## Evaluating JavaScript

Puppeteer pages have a handy `evaluate()` function that lets you execute
JavaScript in the Chrome window. The `evaluate()` function is the
most flexible way to interact with Puppeteer, because it lets you
control Chrome using browser APIs like [`document.querySelector()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector).

For example, the below script searches for "JavaScript" on Google,
and gets the top 10 results.

```javascript
[require:Fundamentals puppeteer basic google search$]
```

## Using Puppeteer with a Local Web Server

Because Node.js uses an event loop, it is easy to start an Express
server and connect Puppeteer to your Express server in the same
script. This means it is easy to [test Vue apps with Puppeteer](https://thecodebarbarian.com/testing-vue-apps-with-puppeteer-and-mocha).

```javascript
[require:Fundamentals puppeteer local server$]
```