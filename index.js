'use strict';

const acquit = require('acquit');
const fs = require('fs');
const home = require('./components/home');
const layout = require('./components/layout');
const list = require('./components/list');
const marked = require('marked');
const transform = require('acquit-require');

require('acquit-ignore')();

const highlight = require('highlight.js');
marked.setOptions({
  highlight: function(code) {
    return highlight.highlight('JavaScript', code).value;
  }
});

run().then(() => console.log('done')).catch(err => console.log(err));

async function run() {
  const tests = [
    ...acquit.parse(fs.readFileSync('./examples/axios.test.js', 'utf8')),
    ...acquit.parse(fs.readFileSync('./examples/fundamentals.test.js', 'utf8')),
    ...acquit.parse(fs.readFileSync('./examples/mongoose.test.js', 'utf8'))
  ];

  const tutorials = [
    {
      title: 'Updating Documents in Mongoose',
      raw: './tutorials/mongoose/update.md',
      url: '/tutorials/mongoose/update',
      description: 'Learn about the different ways to update a document in Mongoose.',
      tags: ['mongoose']
    },
    {
      title: 'Calculate Standard Deviation in JavaScript',
      raw: './tutorials/fundamentals/stddev.md',
      url: '/tutorials/fundamentals/stddev',
      description: 'Use Mathjs to calculate standard deviation in Node.js and the browser.',
      tags: ['fundamentals']
    },
    {
      title: 'Understand valueOf() in JavaScript',
      raw: './tutorials/fundamentals/valueof.md',
      url: '/tutorials/fundamentals/valueof',
      description: 'Learn what String valueOf(), Number valueOf(), and Date valueOf() have in common.',
      tags: ['mongoose']
    },
    {
      title: 'Debug E11000 Errors in Mongoose',
      raw: './tutorials/mongoose/duplicate_key.md',
      url: '/tutorials/mongoose/e11000-duplicate-key',
      description: 'Learn how to understand and debug E11000 errors in Mongoose.',
      tags: ['mongoose']
    },
    {
      title: 'Get the Current Timestamp in JavaScript',
      raw: './tutorials/fundamentals/timestamps.md',
      url: '/tutorials/fundamentals/timestamps',
      description: 'Learn how to get the current Unix time in JavaScript.',
      tags: ['fundamentals']
    },
    {
      title: 'Setting Request Headers with Axios',
      raw: './tutorials/axios/headers.md',
      url: '/tutorials/axios/headers',
      description: 'Learn how to set HTTP request headers on GET and POST requests with the Axios HTTP client.',
      tags: ['axios']
    }
  ];

  fs.writeFileSync('./index.html', home({ posts: tutorials }));

  for (const tutorial of tutorials) {
    console.log(tutorial);
    tutorial.content =
      marked(transform(fs.readFileSync(tutorial.raw, 'utf8'), tests));
    const html = layout(tutorial);
    fs.writeFileSync('.' + tutorial.url + '.html', html);
  }

  fs.writeFileSync('./all.html', layout({
    title: 'All Tutorials',
    content: list({ posts: tutorials })
  }));
}