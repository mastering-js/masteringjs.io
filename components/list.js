'use strict';

module.exports = ({ posts, title }, limit) => `
<h1>${title}</h1>
<div class="list">
  ${posts.slice(0, limit).map(post).join('\n')}
</div>
`;

const post = p => `
<div class="post">
  <div class="title">
    <a href="${p.url}">${p.title}</a>
  </div>
  <div class="description">
    ${p.description}
  </div>
  <div class="tags">
    ${p.tags.map(tag).join('\n')}
  </div>
</div>
`;

const tag = t => `
<span class="tag">
  <a href="/${t}">${t}</a>
</span>
`;