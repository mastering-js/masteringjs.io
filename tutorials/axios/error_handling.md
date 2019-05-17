By default, [Axios](https://www.npmjs.com/package/axios) error messages only include the status code. This is a sensible default, but the default error message is often not helpful.

```javascript
[require:axios.*interceptors.*default error message]
```

Thankfully, Axios makes it easy to transform errors so the error message makes sense for your application. [Axios interceptors](https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index#//dash_ref/Category/Interceptors/1) allow you to transform all errors coming out of Axios.

```javascript
[require:axios.*interceptors.*using interceptors]
```