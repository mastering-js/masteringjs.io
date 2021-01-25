To use axios in any of your projects you must first import it by assigning it to a variable, which is usually called axios, though you are free to name it anything else.
`const axios = require('axios')`

Once that is done you can make different requests like `axios.get()` or `axios.post()` as needed. However, you can also make an `axios()` function call. The most barebones axios function call you could make is `axios(https://httpbin.org/get)` as the default for an `axios()` function call is the GET request.

Think of the `axios()` function call similarly to an ajax call or a fetch request where you have to define what kind of request it is and what you want to send in the call as follows:

```javascript
[require:axios axios-call]
```
