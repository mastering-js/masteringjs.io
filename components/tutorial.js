'use strict';

const _ = require('lodash');
const list = require('./list');

module.exports = ({ tutorials, tutorial }) => `
  ${tutorial.content}
  <hr>
  <h2>More ${_.capitalize(tutorial.tags[0])} Tutorials</h2>
  <ul>
  ${tutorials.filter(t => t.tags.includes(tutorial.tags[0]) && t !== tutorial).map(_tutorial).join('\n')}
  </ul>
`;

function _tutorial(tutorial) {
  return `
    <li><a href="${tutorial.url}">${tutorial.title}</a></li>
  `;
}