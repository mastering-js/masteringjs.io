When making a standard axios request, the response contains six properties including `data`, the one we will be discussing.
`data` is simply the response that was provided by the server. `data` will usually be either a string, object, or undefined depending on what information you requested from the server.
In the example below, `res.data` is an object as it contains a series of key value pairs.

```javascript
[require:axios axios-dataA]
```

`res.data` returns the following:

```javascript
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
```

If you wanted the data to be of a different type, you could use axios's `responseType` property in conjunction with the `transformResponse` property.
The options for `responseType` are:

1. arraybuffer
2. document
3. json (default)
4. text
5. stream
6. blob (browser only)

Here is an example that is making the same exact request that returned an object but now will return a string.

```javascript
[require:axios axios-dataB]
```

**Note:** This is just an example and responses from different servers will vary.
In this example, the unfiltered response, **res**, contains much more information about the request and response.
This information could be helpful if the project your working on needs something from it or you are debugging, however, most of the time directly accessing the data is all that will be needed.
