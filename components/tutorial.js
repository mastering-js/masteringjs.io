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
  ${tutorial.content}
  ${cta(tutorial)}
  <hr class="tutorial-separator">
  <div id="jobs">
    <div id="jobs-container">

    </div>
    <div>
      <div class="button jobs-view-more">
        <a href="/jobs">
          View more jobs!
        </a>
      </div>
    </div>
  </div>
  <script src="../../src/client/listjobs.js"></script>
  <script src="//m.servedby-buysellads.com/monetization.js" type="text/javascript"></script>
  <script>
  (function(){
    if(typeof _bsa !== 'undefined' && _bsa) {
      _bsa.init('default', 'CE7I62QE', 'placement:masteringjsio', { target: "#default_masteringjsio", align: "horizontal" });
    }
  })();
	</script>
  ${more(tutorials, tutorial)}
  ${tutorial.sidebar || ''}
`;

function more(tutorials, tutorial) {
  if (tutorial.next || tutorial.prev) {
    return `
    <div class="tutorial-nav-buttons">
      ${prevButton(tutorial.prev)}
      ${nextButton(tutorial.next)}
      <div style="clear:both"></div>
    </div>
    `;
  }

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

function prevButton(prev) {
  if (prev == null) {
    return '';
  }

  return `
  <div class="left">
    <div class="button"><a href="${prev.url}">&lsaquo; ${prev.title}</a></div>
  </div>
  `;
}

function nextButton(next) {
  if (next == null) {
    return '';
  }

  return `
  <div class="right">
    <div class="button"><a href="${next.url}">${next.title} &rsaquo;</a></div>
  </div>
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
