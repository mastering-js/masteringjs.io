To convert JSON to YAML, you should install [json-to-pretty-yaml](https://www.npmjs.com/package/json-to-pretty-yaml).
use the `stringify` function() from the npm module to convert the JSON.


```javascript
const YAML = require('json-to-pretty-yaml');

const json = {"a": 1, "b": 2, "c": 3};

const data = YAML.stringify(json);

data;
/*
a: 1
b: 2
c: 3
*/
```