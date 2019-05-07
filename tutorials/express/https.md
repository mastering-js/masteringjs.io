Setting up an HTTPS server on localhost is tricky, but doable. You will need to create an HTTPS certificate and configure your browser to trust your new certificate. Thankfully, there's a tool for that.

First, you will need to set up [mkcert](https://github.com/FiloSottile/mkcert). The easiest way is to download the [prebuilt mkcert binary](https://github.com/FiloSottile/mkcert/releases) for your platform. Below are the commands I ran to create a trusted certificate for `localhost`.

```
$ wget https://github.com/FiloSottile/mkcert/releases/download/v1.3.0/mkcert-v1.3.0-linux-amd64
$ chmod 0755 ./mkcert-v1.3.0-linux-amd64 
$ ./mkcert-v1.3.0-linux-amd64 -install
Using the local CA at "/home/user/.local/share/mkcert" ✨
The local CA is now installed in the Firefox and/or Chrome/Chromium trust store (requires browser restart)! 🦊

$ ./mkcert-v1.3.0-linux-amd64 localhost
Using the local CA at "/home/val/.local/share/mkcert" ✨

Created a new certificate valid for the following names 📜
 - "localhost"

The certificate is at "./localhost.pem" and the key at "./localhost-key.pem" ✅

```

Now that you have `localhost.pem` and `localhost-key.pem`, let's use them to start an [Express](http://expressjs.com/) server that responds to `https://localhost`. To do this, you will need to read the `localhost.pem` and `localhost-key.pem` files, and pass them to [Node.js' native `https.createServer()` function](https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener).

```javascript
[require:Express.*https.*works]
```