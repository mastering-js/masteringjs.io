The [axios API](https://github.com/axios/axios#axios-api) states that to make a `DELETE` request,
you must pass in a `url` and then any `config` specifications. You can send a [body with the delete
request](/tutorials/axios/delete), however, the server would not process it as it is outside the scope of what a `DELETE` request
is [supposed to do](https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-p2-semantics-19#page-23).

```javascript
const res = await axios.delete('https://httpbin.org/delete', { data: { answer: 42 } });

res.data.json; // { answer: 42 }
```
