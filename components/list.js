'use strict';

module.exports = ({ posts, title, hero }, limit) => `
<style>
  .hero img {
    border: 0px;
    padding: 0;
  }

  .hero p {
    padding-bottom: 0.5em;
    font-size: 1.25em;
  }
</style>
<div class="hero">
  ${hero ? hero : ''}
</div>
${displayTitle(title)}
<div class="list">
  ${posts.slice(0, limit).map(post).join('\n')}
</div>
`;

const displayTitle = t => t == null ? '' : `
<h1>${t}</h1>
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