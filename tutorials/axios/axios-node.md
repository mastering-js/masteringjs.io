When making http requests in node, users have the option of using fetch(). Another option available to those developers is the axios library. Instead of having to do:  

```javascript
[require:axios Node node]
```

You can do the following:

```javascipt
[require:axios Node axios]
```

If you were to be sending data through a POST request for example, the data would have to be of type:

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
