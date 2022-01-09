'use strict';

module.exports = () => `
<footer id="footer" class="footer">
  <div class="container">
  <div class="group">
      <div class="col span_1_of_3">
      <img class="footerLogo" src="/assets/images/footer/logo.svg" alt="logo">
      <div class="socialIcon">
        <a href="https://twitter.com/mastering_js"><img src="/assets/images/footer/twitter.svg" alt="twitter"></a>
        <a href="https://github.com/mastering-js/masteringjs.io"><img src="/assets/images/footer/github.svg" alt="github"></a>
        <!-- <a href="#"><img src="/assets/images/footer/linkedin.svg" alt="linkedin"></a> -->
      </div>
      <div class="locationAndMail">
        <span class="addressCtrl"><img src="/assets/images/footer/location.svg" alt="location"> <span>Miami Beach, FL</span></span>
      </div>
      <div class="copyRight">
        <p class="copyRight">Copyright © MeanIT Software, Inc.</p>
      </div>
      </div>
      <div class="col span_2_of_3 footerLink">
          <div class="col span_1_of_3 tutorial">
            <h4>Tutorials</h4>
              <ul>
                  <li> <a href="/fundamentals">Fundamentals</a></li>
                  <li> <a href="/node">Node</a></li>
                  <li> <a href="/vue">Vue</a></li>
                  <li> <a href="/webpack">Webpack</a></li>
                  <li> <a href="/axios">Axios</a></li>
                  <li> <a href="/mongoose">Mongoose</a></li>
                  <li> <a href="/express">Express</a></li>
                  <li> <a href="/lodash">Lodash</a></li>
                  <li> <a href="/npm">npm</a></li>
                  <li> <a href="/eslint">ESLint</a></li>
                  <li> <a href="/sinon">Sinon</a></li>
              </ul>
              <div class="subscribe">
                <span class="subscribeText">Get Tutorials Weekly →</span> <a href="https://www.getrevue.co/profile/masteringjs"><button class="subscribeBtn">Subscribe</button></a>
              </div>
      </div>
      <div class="col span_1_of_3">
                  <h4>eBooks</h4>
                  <ul>
                      <li> <a href="/ebooks/mastering-mongoose">Mastering Mongoose</a></li>
                  </ul>
    </div>
    <div class="col span_1_of_3">
      <h4>Resources</h4>
      <ul>
        <li> <a href="/about">About</a></li>
        <li> <a href="/jobs/create">For Recruiters</a></li>
        <li> <a href="https://github.com/sponsors/mastering-js">Partnerships</a></li>
      </ul>
    </div>
  </div>
  </div>
</div>
</div>
</footer>
`;
