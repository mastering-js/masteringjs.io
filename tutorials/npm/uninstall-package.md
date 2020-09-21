[npm makes it easy to uninstall packages](https://docs.npmjs.com/uninstalling-packages-and-dependencies). Running
`npm uninstall <package>` uninstalls the given package. For example, when you run `npm uninstall mongoose`
from the Mastering JS GitHub repo, [npm](http://thecodebarbarian.com/an-introduction-to-npm.html) prints the
below output:

```
$ npm uninstall mongoose

removed 22 packages and audited 1204 packages in 3.311s
found 0 vulnerabilities

$ 
```

After running `npm uninstall mongoose`, the `node_modules` directory no longer contains Mongoose, and calling
`require('mongoose')` will fail.

```
$ ls -l node_modules/ | grep "mongoose$"
$ 
$ node -e "require('mongoose')"
internal/modules/cjs/loader.js:800
    throw err;
    ^

Error: Cannot find module 'mongoose'
$ 
```

What Does npm uninstall Do?
---------------------------

`npm uninstall` does a little more than just `rm -rf ./node_modules/mongoose`. Although deleting the `node_modules/mongoose`
directory works, it leaves Mongoose's dependencies in `node_modules`.

Notice that the output of `npm uninstall` says it removed 22 packages:

```
$ npm uninstall mongoose

removed 22 packages and audited 1204 packages in 3.311s
found 0 vulnerabilities

$ 
```

Those are packages that Mongoose depends on, but no other package depends on, so they're safe to remove.

The `--no-save` Flag
--------------------

`npm uninstall` also removes the package from your `package.json`, which means subsequent
`npm install` won't install that package. This is a convenience that saves you an extra step when you want to
permanently remove a package from a JavaScript project.

However, there are cases when you may want to uninstall a package without modifying `package.json`. For example,
you may want to test that your app still works even if a certain package is missing. In that case, you can use
`npm uninstall --no-save`:

```
$ npm uninstall mongoose --no-save

removed 22 packages and audited 1204 packages in 3.311s
found 0 vulnerabilities

$ 
$ cat package.json | grep "mongoose"
    "mongoose": "5.x",
    "mongoose-beautiful-unique-validation": "7.x",
$ 
```