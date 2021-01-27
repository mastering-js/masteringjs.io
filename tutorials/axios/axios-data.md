When making a standard axios request, the response contains six properties including `data`, the one we will be discussing. `data` is simply the response that was provided by the server. `data` could be anything, it could be a string, number, or object depending on what information you requested from the server. In the example below, data is an object as it contains a series of key value pairs.

```javascript
[require:axios axios-data]
```

**res.data** returns the following:

    {
    args: {},
    headers: {
    Accept: 'application/json, text/plain, _/_',
    Host: 'httpbin.org',
    'User-Agent': 'axios/0.19.2',
    'X-Amzn-Trace-Id': 'Root=1-6011aa12-6d7a1ae8689dd32256ab1be7'
    },
    origin: '99.138.93.108',
    url: 'https://httpbin.org/get'
    }

**Note:** This is just an example and responses from different servers will vary. In this example, the unfiltered response, res, contains much more information about the request and response. This information could be helpful if the project your working on needs something from it or you are debugging, however, most of the time directly accessing the data is all that will be needed.
