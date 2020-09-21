When you want to report a bug in an npm package, most packages ask you for what
version of the package you're using. Just looking at `package.json` isn't enough
if you're using semver ranges. If your `package.json` file says `"mongoose": "5.x"`,
'5.x' is **not** a version, it's a [_range_](https://docs.npmjs.com/misc/semver#ranges).

To get what version of Mongoose you currently have installed, run `npm list mongoose`,
or `npm ls mongoose` for short. For example, here's the result of running `npm list mongoose` from the [Mastering JS git repo](https://github.com/vkarpov15/masteringjs.io).
It shows that the currently installed version of Mongoose is v5.10.6.

```
$ npm list mongoose
masteringjs.io@ /path/to/masteringjs.io
└── mongoose@5.10.6 

$ 
```

Listing Multiple Packages
-----------------

Running `npm list` without a package name prints all installed packages, including
their dependencies, with version numbers. The output of `npm list` is typically too big
to read, but the beginning looks like this:

```
masteringjs.io@ /path/to/masteringjs.io
├── @awaitjs/express@0.3.0
├─┬ @google-cloud/storage@4.3.1
│ ├─┬ @google-cloud/common@2.4.0
│ │ ├── @google-cloud/projectify@1.0.4
...
```

However, you can make the output more usable by using `--depth=0` to
only show the version of top-level dependencies.

```
npm list --depth=0
```

Below is the beginning of the output of `npm list --depth=0` for the Mastering JS
git repo:

```
masteringjs.io@ /path/to/masteringjs.io
├── @awaitjs/express@0.3.0
├── @google-cloud/storage@4.3.1
├── @vue/test-utils@1.0.5
├── acquit@1.1.0
├── acquit-ignore@0.1.1
├── acquit-require@0.1.1
├── adm-zip@0.4.14
├── apollo-server@2.17.0
├── aws-sdk@2.756.0
├── axios@0.19.2
```