To convert JSON to YAML, you should install [json-to-pretty-yaml](https://www.npmjs.com/package/json-to-pretty-yaml).
Use the `stringify` function() from the npm module to convert the JSON.

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

<div id='json'></div>
<button id='work' onclick="window.convert">Turn JSON into YAML!</button>
<div id='yaml'></div>
<script src="../../codemirror-5.62.2/lib/codemirror.js"></script>
<link rel="stylesheet" href="../../codemirror-5.62.2/lib/codemirror.css">
<script src="../../codemirror-5.62.2/mode/yaml/yaml.js"></script>
<script src="../../codemirror-5.62.2/mode/javascript/javascript.js"></script>
<script src="../jsontoyaml.js"></script>