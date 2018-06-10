import babel from 'rollup-plugin-babel'
import pkg from './package.json'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const banner = format => `/*!
* wecache.${format}.js v${pkg.version}
*/`

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/wecache.umd.js',
      format: 'umd',
      name: 'wecache',
      banner: banner('umd')
    },
    plugins: [
      nodeResolve({
        module: true,
        jsnext: true,
        extensions: ['.js', '.json']
      }),
      commonjs(),
      babel({
        exclude: 'node_modules/**'
      })
    ]
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/wecache.cjs.js',
      format: 'cjs',
      banner: banner('cjs')
    },
    plugins: [
      babel({
        exclude: 'node_modules/**'
      })
    ]
  }
]
