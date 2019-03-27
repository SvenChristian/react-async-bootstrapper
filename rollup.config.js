const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const changeCase = require('change-case')
const packageJson = require('./package.json')

process.env.BABEL_ENV = 'production'

module.exports = {
  external: ['react'],
  input: 'src/index.js',
  output: {
    file: `dist/${packageJson.name}.js`,
    format: 'cjs',
    sourcemap: true,
    name: changeCase
      .titleCase(packageJson.name.replace(/-/g, ' '))
      .replace(/ /g, ''),
  },
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),
    babel({
      babelrc: false,
      exclude: 'node_modules/!(react-tree-walker)/**',
      presets: [['env', { modules: false }], 'stage-3', 'react'],
      plugins: ['external-helpers'],
    }),
  ],
}
