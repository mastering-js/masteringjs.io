'use strict';

const express = require('express');
const puppeteer = require('puppeteer');

run().catch(err => console.log(err));

async function run() {
  const app = express();
  app.use(express.static('./ebooks'));
  const server = await app.listen(3001);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 650, height: 150 });

  await page.goto('http://localhost:3001/mastering-mongoose-horizontal-banner.html');
  await new Promise(resolve => setTimeout(resolve, 1000));
  await page.screenshot({ path: './ebooks/mastering-mongoose-horizontal.png' });

  await server.close();
  await browser.close();
}

