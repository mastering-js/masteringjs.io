Using the `FormData()` class, you can send form data to your express backend.
Frontend:

```javascript
      
run().catch(err => console.log(err));
async function run() {
  const file = require('../../yinyang.png');

  const formData = new FormData();
  formData.append('yinyang.png', file);

  // Post the form, just make sure to set the 'Content-Type' header
  const res = await axios.post('//localhost:5001/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  // Prints "yinyang.png"
  console.log(res.data);
}
```

Node.js does not have a built-in `FormData` class, so you will need to download the [`form-data` npm module](https://www.npmjs.com/package/form-data).

```javascript
const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

const formData = new FormData();
formData.append('yinyang.png', fs.createReadStream('./yinyang.png'));
const res = await axios.post('http://localhost:3000/upload', formData, {
  // You need to use `getHeaders()` in Node.js because Axios doesn't
  // automatically set the multipart form boundary in Node.
  headers: formData.getHeaders()
});
```

Then on the backend, you can perform whatever actions you deem fit, like sending back the keys from the form data. <br />
Backend:

```javascript
app.post('/upload', function(req,res) {
    if(req == null) {
        return res.status(400).json({error: 'no data'});
    }
    const data = Object.keys(req);
    return res.status(200).json({data: data});
})
```