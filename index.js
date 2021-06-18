'use strict';

const { Feed } = require('feed');
const acquit = require('acquit');
const fs = require('fs');
const highlight = require('highlight.js');
const home = require('./components/home');
const layout = require('./components/layout');
const list = require('./components/list');
const marked = require('marked');
const requestInvite = require('./components/request-invite');
const transform = require('acquit-require');
const tutorialTemplate = require('./components/tutorial');
const jobs = require('./components/jobs');
const createjob = require('./components/createjob');
const success = require('./components/success');
const failure = require('./components/failure');

require('acquit-ignore')();

marked.setOptions({
  highlight: function(code) {
    return highlight.highlight('JavaScript', code).value;
  }
});

run().then(() => console.log('done')).catch(err => console.log(err));

async function run() {
  const tests = [
    ...acquit.parse(fs.readFileSync('./examples/axios.test.js', 'utf8')),
    ...acquit.parse(fs.readFileSync('./examples/express.test.js', 'utf8')),
    ...acquit.parse(fs.readFileSync('./examples/fundamentals.test.js', 'utf8')),
    ...acquit.parse(fs.readFileSync('./examples/graphql.test.js', 'utf8')),
    ...acquit.parse(fs.readFileSync('./examples/lodash.test.js', 'utf8')),
    ...acquit.parse(fs.readFileSync('./examples/mocha.test.js', 'utf8')),
    ...acquit.parse(fs.readFileSync('./examples/mongoose.test.js', 'utf8')),
    ...acquit.parse(fs.readFileSync('./examples/node.test.js', 'utf8')),
    ...acquit.parse(fs.readFileSync('./examples/vue.test.js', 'utf8')),
    ...acquit.parse(fs.readFileSync('./examples/webpack.test.js', 'utf8'))
  ];

  const tutorials = require('./src/tutorials');

  fs.writeFileSync('./index.html', home({ posts: tutorials }));

  const f = new Feed({
    title: 'Mastering JS',
    description: 'Detailed, pragmatic full stack JavaScript tutorials focusing on the VENOM (MEVN) stack.',
    link: 'https://masteringjs.io',
    image: 'https://masteringjs.io/assets/logo.svg',
    author: {
      name: 'Valeri Karpov'
    }
  });

  for (const tutorial of tutorials) {
    console.log(tutorial);

    if (tutorial.tags[0] === 'mongoose') {
      //ad = `
      //<a href="/ebooks/mastering-mongoose"><img src="/assets/images/ebooks/mongoose-banner.png" border="0" alt="" width="160" height="600" class="right-banner" /></a>      `;
      tutorial.cta = 'mongoose';
    }
    if (tutorial.tags[0] === 'express') {
      tutorial.cta = 'express';
    }
    if (tutorial.tags[0] === 'vue') {
      tutorial.cta = 'vueschool';
    }
    if (tutorial.tags[0] === 'axios') {
      tutorial.sidebar = require('./components/axiosSidebar')(tutorial);
    }
    tutorial.content =
      marked(transform(fs.readFileSync(tutorial.raw, 'utf8'), tests));
    let ad = null;
    tutorial.content = tutorialTemplate({ tutorial, tutorials });

    if (tutorial.tags[0] === 'eslint') {
      ad = `
      <a href="https://pluralsight.pxf.io/c/1321469/431400/7490" id="431400"><img src="//a.impactradius-go.com/display-ad/7490-431400" border="0" alt="" width="160" height="600" class="right-banner" /></a><img height="0" width="0" src="//pluralsight.pxf.io/i/1321469/431400/7490" style="position:absolute;visibility:hidden;" border="0" />
      `;
    }

    const html = layout({ ...tutorial, ad });
    fs.writeFileSync('.' + tutorial.url + '.html', html);

    f.addItem({
      title: tutorial.title,
      link: 'https://masteringjs.io' + tutorial.url,
      date: tutorial.date.toDate()
    });
  }

  fs.writeFileSync('./feed.xml', f.rss2().replace(new RegExp('<content:encoded/>', 'g'), ''));

  const byTag = new Map();
  for (const tutorial of tutorials) {
    for (const tag of tutorial.tags) {
      if (!byTag.has(tag)) {
        byTag.set(tag, []);
      }
      byTag.get(tag).push(tutorial);
    }
  }

  for (const [tag, tutorials] of byTag.entries()) {
    let hero = '';
    try {
      hero = require('./components/heros/' + tag)();
    } catch (err) {}

    fs.writeFileSync(`./${tag}.html`, layout({
      title: `${capitalize(tag)} Tutorials`,
      content: list({
        posts: tutorials,
        title: `${capitalize(tag)} Tutorials`,
        hero
      }),
      description: `Bite-sized ${capitalize(tag)} tutorials for busy developers`
    }));
  }

  fs.writeFileSync('./all.html', layout({
    title: 'All Tutorials',
    content: list({ posts: tutorials, title: 'All Tutorials' }),
    description: `Bite-sized JavaScript tutorials for busy developers`
  }));

  let pages = [];
  const defaultSalesPageProps = { defaultPrice: '39.99', template: require('./components/ebooks/mongoose') };
  pages = pages.concat([
    { path: './ebooks/mastering-mongoose.html' },
    {
      path: './ebooks/mastering-mongoose-subscribers.html',
      paypalButton: `
      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
      <input type="hidden" name="cmd" value="_s-xclick">
      <input type="hidden" name="hosted_button_id" value="ZGQYWD3M58BAW">
      <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
      <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
      </form>      
      `,
      promoPrice: '37.99'
    },
    {
      path: './ebooks/mastering-mongoose-wyncode.html',
      paypalButton: `
      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
      <input type="hidden" name="cmd" value="_s-xclick">
      <input type="hidden" name="hosted_button_id" value="2K67BPACMALH2">
      <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
      <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
      </form>
      `,
      promoPrice: '35.99'
    },
    {
      path: './ebooks/mastering-mongoose-node-weekly.html',
      paypalButton: `
      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
      <input type="hidden" name="cmd" value="_s-xclick">
      <input type="hidden" name="hosted_button_id" value="3Y679N5G7ZFQ2">
      <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
      <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
      </form>
      `,
      promoPrice: '35.99'
    },
    {
      path: './ebooks/mastering-mongoose-jsla.html',
      paypalButton: `
      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
      <input type="hidden" name="cmd" value="_s-xclick">
      <input type="hidden" name="hosted_button_id" value="EJS6NLXCNA5KJ">
      <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
      <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
      </form>
      `,
      promoPrice: '35.99'
    },
    {
      path: './ebooks/mastering-mongoose-mongodb.html',
      paypalButton: `
      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
      <input type="hidden" name="cmd" value="_s-xclick">
      <input type="hidden" name="hosted_button_id" value="CASA897R74TC8">
      <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
      <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
      </form>
      `,
      promoPrice: '35.99'
    },
    {
      path: './ebooks/mastering-mongoose-javascript-jabber.html',
      paypalButton: `
      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="JAZZNXHVDPM52">
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
</form>
      `,
      promoPrice: '35.99'
    },
    {
      path: './ebooks/mastering-mongoose-corporate.html',
      paypalButton: `
      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="VYBY5BN38CP44">
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
</form>
      `,
      promoPrice: '99.00',
      defaultPrice: '39.99/Person'
    }
  ].map(p => ({ ...defaultSalesPageProps, ...p })));

  pages.push({
    path: './request-invite.html',
    template: layout,
    title: 'Request Invite',
    content: requestInvite(),
    description: ''
  });
  pages.push({
    path: './ebooks/mastering-mongoose-thankyou.html',
    template: layout,
    title: 'Request Invite',
    content: require('./components/ebooks/mastering-mongoose-thankyou')(),
    description: ''
  });
  pages.push({
    path: './jobs.html',
    template: layout,
    title: 'The #1 JavaScript Job Board | Mastering JS',
    content: jobs(),
    description: 'Hire the best JavaScript developers in the world on Mastering JS and reach 100k pragmatic JS devs per month.'
  });
  pages.push({
    path: './jobs/create.html',
    template: layout,
    title: 'Hire JavaScript Developers | Mastering JS',
    content: createjob(),
    description: 'Hire the best JavaScript developers in the world on Mastering JS and reach 100k pragmatic JS devs per month.',
    carbonAds: false
  });
  pages.push({
    path: './jobs/success.html',
    template: layout,
    title: 'Thank you!',
    content: success(),
    description: 'Successfully posted a job'
  });
  pages.push({
    path: './jobs/failure.html',
    template: layout,
    title: 'Oh No!',
    content: failure(),
    description: 'Something went wrong'
  });
  for (const page of pages) {
    console.log(page.path)
    fs.writeFileSync(page.path, page.template({ ...page }));
  }
}

function capitalize(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}
