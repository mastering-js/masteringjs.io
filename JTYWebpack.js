const webpack = require('webpack');
const path = require('path')

const compiler = webpack({
    entry: './src/client/jsonyamlconvert.js',
    output: {
      filename: 'jsontoyaml.js',
      path: path.resolve(__dirname, 'assets/js'),
    },
    resolve: {
        modules: ['node_modules']
    },
    optimization: {
      minimize: false
    },
    node: {
        fs: 'empty'
    }
});

async function run() {
    await new Promise((resolve, reject) => {
        compiler.run((err, res) => {
            if(err) {
                return reject(err)
            }
            resolve(res);
        });
    });
}
run();
