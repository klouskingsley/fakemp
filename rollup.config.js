import babel from 'rollup-plugin-babel'
import pkg from './package.json'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace';

const banner = format => `/*!
* fakemp.${format}.js v${pkg.version}
*/`

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/fakemp.umd.js',
      format: 'umd',
      name: 'fakemp',
      banner: banner('umd')
    },
    plugins: [
      nodeResolve({
        module: true,
        jsnext: true,
        extensions: ['.js', '.json']
      }),
      commonjs(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      babel({
        exclude: 'node_modules/**'
      })
    ]
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/fakemp.cjs.js',
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
