Using the `FormData()` class, you can send form data to your express backend. <br />
Frontend:

```javascript
async function run() {
    const formData = new FormData();
    formData.append('The meaning of life', 42);
    formData.append('The circle of life', 0);
    const res = await axios.post('localhost:5000/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
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