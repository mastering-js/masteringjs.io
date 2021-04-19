[Axios](https://github.com/axios/axios) has a `User-Agent` property which allows you to to identify
the type of device making the request to the server so it knows what data to send back.
This feature is not standard and so you will need to see if the
server you are making a request to has the functionality.
The `User-Agent` property takes a
[string](https://deviceatlas.com/blog/list-of-user-agent-strings)
to tell the server the device making the request. The string follows a
[structure](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agents) to properly identify itself.
Below is an example of making a request on a Windows 10 PC using an Edge browser:

```javascript
[require:axios user-agent-test]
```
