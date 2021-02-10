[Vue](https://vuejs.org/) is a powerful and flexible frontend framework that we think
every JavaScript developer should know. We recommend [Vue over frameworks like React and Angular 2](https://www.getrevue.co/profile/masteringjs/issues/5-reasons-why-vue-is-better-than-react-247970) for most applications. Here's a couple of reasons why:

1. **Easy to get started:** Vue supports vanilla JavaScript and HTML, which means you can [load Vue from a CDN](https://masteringjs.io/tutorials/vue/cdn) and start using it in your HTML pages without any compilation step. For more sophisticated apps, the [Vue CLI](/tutorials/vue/cli) makes it easy to get started.
2. **Delightfully portable:** Because of Vue's variety of syntaxes, support for Node.js, and excellent [server side rendering](/tutorials/vue/ssr) support, Vue is flexible enough to handle almost any use case. Vue isn't just for standard single page applications! We use Vue as a [templating language for HTML emails](https://www.getrevue.co/profile/masteringjs/issues/converting-vanilla-html-to-vue-242335), as a [minimal static site generator](http://thecodebarbarian.com/using-vue-as-a-node-js-static-site-generator.html), and for [drawing SVG graphics](/tutorials/vue/svg).
3. **Data binding done right:** [Vue 3 uses proxies](https://www.getrevue.co/profile/masteringjs/issues/lessons-from-upgrading-to-vue-3-300088) to make it so that vanilla JavaScript assignments, like `this.message = 'Hello'`, propagate automatically to the DOM. The Vue 3 composition API, with `provide()` and `inject()`, makes [prop drilling](https://kentcdodds.com/blog/prop-drilling) obsolete. In other words, state management comes built-in: no need to install and maintain dozens of conflicting packages.
4. **Amazing community:** Vue is an [independent project](https://www.getrevue.co/profile/masteringjs/issues/the-benefits-of-indie-open-source-software-222278) maintained by a community of open source developers. There's also vibrant ecosystem of open source projects built around Vue, like [Vuex](http://npmjs.com/package/vuex) and [Vitepress](https://www.npmjs.com/package/vitepress).

Without further ado, here are the best books to learn Vue.js:

## Best Overall: [_Fullstack Vue: The Complete Guide to Vue.js_](https://www.amazon.com/gp/product/1987595297/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1987595297&linkCode=as2&tag=codebarbarian-20&linkId=7eebd267324f4c5d2716ca0d72358f24)

<div class="image-pull-left">
<a target="_blank"  href="https://www.amazon.com/gp/product/1987595297/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1987595297&linkCode=as2&tag=codebarbarian-20&linkId=7eebd267324f4c5d2716ca0d72358f24"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=1987595297&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=codebarbarian-20"></a>
</div>

_Fullstack Vue_ is a tutorial-driven book that walks you through building a "Upvote" app similar to Reddit. It introduces Vue via the CDN approach, but quickly switches to single file components and Vuex.

We strongly recommend this book because it covers everything you need to know to build a modern app in Vue, including best practices for server communication. This book offers a fairly opinionated view of how you should build Vue apps: using Vue CLI, Vuex, and single file components. It doesn't cover every common approach to building Vue apps, but it covers one approach very well. That makes it a good choice both for beginners looking to get started with minimal [yak-shaving](https://americanexpress.io/yak-shaving/), and advanced developers looking to expand their skills or fill any gaps in their knowledge.

<div style="clear: both"></div>

## Best for Beginners: [_Getting to Know Vue.js: Learn to Build Single Page Applications in Vue from Scratch_](https://www.amazon.com/gp/product/1484237803/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1484237803&linkCode=as2&tag=codebarbarian-20&linkId=28b566f9dbc8f765c821ee669779b500)

<div class="image-pull-left">
<a target="_blank"  href="https://www.amazon.com/gp/product/1484237803/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1484237803&linkCode=as2&tag=codebarbarian-20&linkId=28b566f9dbc8f765c821ee669779b500"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=1484237803&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=codebarbarian-20" ></a>
</div>

_Getting to Know Vue.js_ is the right choice for beginners with minimal programming experience. One major advantage is that _Getting to Know Vue.js_ goes into detail about using [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools) and how you can debug your Vue apps with Chrome DevTools.

This book also spends a lot of pages covering basic topics, like event emitters and conditional rendering, that more advanced books may gloss over. However, people who are just learning web development will benefit from going into more depth on these topics, which are useful for learning other
JavaScript frameworks.

<div style="clear: both"></div>

## Best for Advanced Developers and Architects: [_Vue.js in Action_](https://www.amazon.com/gp/product/1617294624/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1617294624&linkCode=as2&tag=codebarbarian-20&linkId=2fa22e3279c6d1c6b4c5916da26effff) 

<div class="image-pull-left">
<a target="_blank"  href="https://www.amazon.com/gp/product/1617294624/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1617294624&linkCode=as2&tag=codebarbarian-20&linkId=2fa22e3279c6d1c6b4c5916da26effff"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=1617294624&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=codebarbarian-20" ></a>
</div>

_Vue.js in Action_ can serve as a basic introduction to Vue, especially if you're used to Manning's books. However, where _Vue.js in Action_ really stands out is its chapters on animations, extensibility, and server communication. This book is unique in that it covers custom directives, [JSX](https://thecodebarbarian.com/overview-of-jsx-with-non-react-examples.html), [Nuxt.js](https://nuxtjs.org/), and several other advanced features that technical architects should know about.

Unlike _Fullstack Vue_, _Vue.js in Action_ takes the extra pages to introduce you to numerous tradeoffs in architecting Vue apps. This extra information might not be useful if you're just looking to build a Vue app, but it is useful if you want to be informed about the different ways you could build a Vue app.

<div style="clear: both"></div>

## Best for Vue 3: [_The Vue 3 Masterclass_](https://vueschool.io/the-vuejs-master-class/?friend=mongoose)

<div class="image-pull-left">
<a target="_blank"  href="https://vueschool.io/the-vuejs-master-class/?friend=mongoose"><img border="0" src="/assets/images/vueschool_320x480_light.png" ></a>
</div>

Disclaimer: this is a video course, not a book. However, we have not been able to find a book about upgrading to Vue 3 that we can recommend. The closest alternative is [_The Vue.js 3 Cookbook_](https://www.amazon.com/gp/product/B08CY3Y8PK/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B08CY3Y8PK&linkCode=as2&tag=codebarbarian-20&linkId=cf512d4801953b6a5a3ed602b06d58a9), which has a good explanation of [what's new in Vue 3](/tutorials/vue/vue-3) at the beginning, but after that becomes too verbose and covers too many topics. We're looking forward to reading [_Vue.js 3 By Example_](https://www.amazon.com/gp/product/1838826343/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1838826343&linkCode=as2&tag=codebarbarian-20&linkId=ff85b329c735d1aac33e957e439c3e1c) when it is released.

Until then, _The Vue 3 Masterclass_ is the best alternative for developers looking to get a handle on what's changed between Vue 2 and Vue 3.

<div style="clear: both"></div>