'use strict';

const list = require('./list');

module.exports = ({ tutorials, tutorial }) => `
  ${tutorial.content}
  <hr>
  ${more(tutorials, tutorial)}
`;

function more(tutorials, tutorial) {
  const otherTutorials = tutorials.
    filter(t => t.tags.includes(tutorial.tags[0]) && t !== tutorial);
  if (otherTutorials.length === 0) {
    return '';
  }
  return `
    <h2>More ${capitalize(tutorial.tags[0])} Tutorials</h2>
    <ul>
    ${otherTutorials.map(_tutorial).join('\n')}
    </ul>
  `;
}

function _tutorial(tutorial) {
  return `
    <li><a href="${tutorial.url}">${tutorial.title}</a></li>
  `;
}

function capitalize(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}