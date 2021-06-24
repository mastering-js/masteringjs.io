[Node.js recommends installing node using `apt-get` on Ubuntu](https://github.com/nodesource/distributions/blob/master/README.md#debinstall).
We disagree.
Installing using [nvm](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04#option-3-%E2%80%94-installing-node-using-the-node-version-manager) is better, as shown below.

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
nvm install v14.12.0
```

However, if nvm doesn't work for some reason, there's a simpler alternative. Node.js is a standalone executable, so all you need to do is download the [Node.js tarball](https://nodejs.org/en/download), extract it, and [symlink](https://www.freecodecamp.org/news/symlink-tutorial-in-linux-how-to-create-and-remove-a-symbolic-link/#:~:text=A%20symlink%20(also%20called%20a,opposed%20to%20%22hard%20links.%22) `node`, `npm`, and `npx` using the `ln` command.
You should be able to do this on a plain Ubuntu machine with zero external dependencies.

```
curl -Ol https://nodejs.org/dist/v14.12.0/node-v14.12.0-linux-x64.tar.gz
tar -zxvf ./node-v14.12.0-linux-x64.tar.gz
sudo ln -s `pwd`/node-v14.12.0-linux-x64/bin/node /usr/bin/node
sudo ln -s `pwd`/node-v14.12.0-linux-x64/bin/npm /usr/bin/npm
sudo ln -s `pwd`/node-v14.12.0-linux-x64/bin/npx /usr/bin/npx
```

## Our Recommendations

We typically use the symlink approach for local development and production applications.
The major downside to the symlink approach is that you need a little extra work to support installing modules globally with `-g`, but you [shouldn't be doing that anyway](http://thecodebarbarian.com/2015/02/27/npm-install--g.html).

However, using nvm is more convenient because you don't need to copy/paste the download URL every time, so we recommend using nvm if you're installing new Node versions regularly or if you aren't comfortable using symlinks.