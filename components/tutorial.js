'use strict';

const _ = require('lodash');
const list = require('./list');

module.exports = ({ tutorials, tutorial }) => `
  ${tutorial.content}
  <hr>
  <h2>More ${_.capitalize(tutorial.tags[0])} Tutorials</h2>
  ${list({ posts: tutorials.filter(t => t.tags.includes(tutorial.tags[0]) && t !== tutorial) })}
`;