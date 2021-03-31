Aliasing is webpack's handy way to shave time and keystrokes
off importing frequently used modules. You will need the
`path` module, included with node.js, as it is how you will tell webpack where
to look for those specific files. Using the `resolve.alias` property,
you can define aliases for frequently imported modules. Here is an example below:

```javascript
const path = require("path");

module.exports = {
  resolve: {
    alias: {
      Library: path.resolve(__dirname, "root/library/"),
      Single: path.resolve(__dirname, "root/test.js"),
    },
  },
};
```

So now when you want to import a file from the library module, you use
`import {file} from 'Library/fileLocation` or if you include the file
with the alias, `import {test} from 'Single'`.

# Using Alias as a Boolean

If you are already loading a library via CDN for your application
and also have it as a dependency, this will create conflicts in your
application. As a result, you can list the path in the `resolve.alias`
property to the conflicting module and set it to false to resolve the conflict.

```javascript
module.exports = {
  resolve: {
    alias: {
      "path/to/ignored/module": false,
    },
  },
};
```

# Using $ For Exact Matches

You can add a trailing `$` to the alias definition and by doing so
ensure that if the path is not an exact match, force an error.

```javascript
const path = require("path");

module.exports = {
  resolve: {
    alias: {
      Single$: path.resolve(__dirname, "root/test.js"),
    },
  },
};
```

So now when you attempt to import test.js:

```javascript
import Test from "Single"; // success
import Test2 from "Single/test.js"; // error, root/test.js is invalid
```
