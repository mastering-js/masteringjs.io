The [npm update command](https://docs.npmjs.com/cli/update) updates one or more packages to the latest version that
satisfies the [semver constraints](https://semver.org/) in `package.json`.

For example, suppose you have the below `package.json`:

```
{
  "dependencies": {
    "mongoose": "5.x"
  }
}
```

Suppose you have Mongoose v5.10.6 installed, and Mongoose v5.10.7 is released. Running `npm update mongoose` will
upgrade your locally installed version of Mongoose to v5.10.7.

Similarly, running `npm update` will update all of your production dependencies to the latest version that satisfies
your semver constraints. `npm update --dev` will update all dependencies, including `devDependencies`.

Changing `package.json`
-----------------------

As of npm 5.0.0, [`npm update` modifies your `package.json`](https://docs.npmjs.com/cli/update#description). In the
above example, `npm update` will change `package.json` to the below:

```
{
  "dependencies": {
    "mongoose": "^5.10.7"
  }
}
```

To opt out of `npm update` rewriting your `package.json` file, run `npm update --no-save`.