import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import sucrase from '@rollup/plugin-sucrase';

export default {
  input: 'src/demo.tsx',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },
  plugins: [
    // typescript(),
    nodeResolve({
      extensions: ['.js', '.ts'],
    }),
    sucrase({
      exclude: ['node_modules/**'],
      transforms: ['typescript'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
      preventAssignment: true,
    }),
    babel({
      presets: ['@babel/preset-react'],
      babelHelpers: 'bundled',
    }),
    commonjs(),
    serve({
      open: true,
      verbose: true,
      contentBase: ['', 'public'],
      host: 'localhost',
      port: 3000,
    }),
    livereload({ watch: 'dist' }),
  ],
};
