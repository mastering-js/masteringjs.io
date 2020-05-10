'use strict';

const track = require('./track');

module.exports = () => `
<div class="nav">
  <div class="branding">
    <div class="logo">
      <img src="/assets/logo.svg" alt="Mastering JS Logo">
    </div>
    <div class="name">
      <a href="/">Mastering JS</a>
    </div>
    <div class="links">
      <a href="/all">Tutorials</a>
      <a href="https://www.getrevue.co/profile/masteringjs">Newsletter</a>
    </div>
    <div style="clear: both"></div>

    ${track()}
  </div>
</div>
<label class="hamburger-menu" for="burger-check">
  &#x2630;
</label>
<input id="burger-check" class="burger-check" type="checkbox" style="display: none" />
<div class="links-mobile">
  <a href="/all">Tutorials</a>
  <a href="https://www.getrevue.co/profile/masteringjs">Newsletter</a>
</div>
`;