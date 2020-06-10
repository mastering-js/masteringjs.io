'use strict';

const list = require('./list');

module.exports = ({ tutorials, tutorial }) => `
  <div class="breadcrumbs">
    <a href="/all">Tutorials</a>
    /
    <a href="/${tutorial.tags[0]}">${capitalize(tutorial.tags[0])}</a>
    /
  </div>
  <h1>${tutorial.title}</h1>
  <div class="date">
    ${tutorial.date ? tutorial.date.format('ll') : ''}
  </div>
  <div id="default_masteringjsio"></div>
  <script>
	(function(){
	  if(typeof _bsa !== 'undefined' && _bsa) {
	    _bsa.init('default', 'CE7I62QE', 'placement:masteringjsio', { target: "#default_masteringjsio", align: "horizontal" });
	  }
	})();
	</script>
  ${tutorial.content}
  ${cta(tutorial)}
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
    ${otherTutorials.slice(0, 7).map(_tutorial).join('\n')}
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

function cta(tutorial) {
  if (tutorial.cta) {
    return `<hr>${require('./ctas/' + tutorial.cta)()}`
  }
  return '';
}
