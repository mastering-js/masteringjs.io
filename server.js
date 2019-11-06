'use strict';

const express = require('express');
const formidable = require('formidable');
const fs = require('fs');

run().catch(err => console.log(err));

async function run() {
  const app = express();
  app.use(require('cors')());

  app.post('/upload', function(req, res) {
    const form = new formidable.IncomingForm();
    // Parse `req` and upload all associated files
    form.parse(req, function(err, fields, files) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      const [firstFileName] = Object.keys(files);

      res.json({ filename: firstFileName });
    });
  });

  app.use(require('express-static')('.'));

  await app.listen(5001);

  console.log('Listening on port 5001');
}