When making http requests, users have the option of using fetch() from the vanilla javascript library to be used on the frontend, or from importing node-fetch. Another option available to those developers is the axios library. Instead of having to do:  

```javascript
[require:axios Node node]
```

You can do the following:

```javascipt
[require:axios Node axios]
```

Or for a simple POST request:

```javascript
[require:axios.*POST requests.*basic example$]
```

When sending requests with data, the data can be of type:

- string
- object
- ArrayBuffer
- ArrayBufferView
- URLSearchParams
- Form Data
- File
- Blob
- Stream
- Buffer

**Note:** Stream and Buffer is for Node only while Form Data, File, and Blob is for the browser only.
