The [`axios.create()` function](https://github.com/axios/axios#creating-an-instance)
creates a new Axios _instance_. When you `require('axios')`, you get back an
the default Axios instance. The reason why you would create an instance is to
set custom defaults for your application.

For example, suppose you wanted
to add a [timeout to all your Axios requests](https://medium.com/@masnun/handling-timeout-in-axios-479269d83c68). You could
create a new Axios instance with a default timeout of 1000 milliseconds:

```javascript
[require:axios.*#create.*basic example$]
```

Another common use case is [setting the `baseURL` for all requests](https://github.com/axios/axios#axioscreateconfig). This is convenient so you
don't have to type out the absolute URL every time.

```javascript
[require:axios.*#create.*baseURL$]
```