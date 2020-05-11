In this tutorial, you'll learn how to build a Vue form that
authenticates using [HTTP basic auth](https://swagger.io/docs/specification/authentication/basic-authentication/) and [Axios](/axios).

Setup with Axios
---------------

[HTTPBin offers a free sample endpoint to test basic auth](http://httpbin.org/#/Auth/get_basic_auth__user___passwd_). The endpoint URL includes the correct username and password for test purposes. For example, the URL `https://httpbin.org/basic-auth/foo/bar` succeeds if you send it properly formatted basic auth for username 'foo' and password 'bar', and fails if you don't.

If you pass the `auth` option to `axios.get()`, Axios will automatically format basic auth.

```javascript
[require:axios.*basic auth.*works]
```

Vue Login Form
--------

[Building a form in Vue](/tutorials/vue/form) is easy: just use [`v-model`](/tutorials/vue/v-model). When the user submits the login form, call the `login()` method
that uses the above Axios logic.

```javascript
[require:Vue login form$]
```