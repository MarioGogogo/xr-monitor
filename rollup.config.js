const path = require('path');
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import deletePlugin from 'rollup-plugin-delete';
import { uglify } from 'rollup-plugin-uglify';
import { name } from './package.json';
import { babel } from '@rollup/plugin-babel';
export default [
  {
    input: 'lib/test.js', // 入口文件
    output: {
      file: `dist/bundle.min.js`, // 输出文件
      format: 'umd',
      name, //这将指定在 UMD 模块中使用的全局变量名称。
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**', // 不编译 node_modules 中的代码
        presets: ['@babel/preset-env'],
      }),
      deletePlugin({
        targets: 'dist/*',
      }),
      // uglify(),
    ],
  },
  {
    input: 'lib/index.js', // 入口文件
    output: {
      file: 'dist/xr-monitor-sdk.js', // 输出文件
      format: 'umd',
      name: 'XrMonitor', //这将指定在 UMD 模块中使用的全局变量名称。
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        presets: ['@babel/preset-env'],
        exclude: 'node_modules/**', // 不编译 node_modules 中的代码
        //plugins: [['transform-remove-console', { exclude: ['error', 'warn'] }]], //删除所有 console.log 语句
      }),
      // deletePlugin({
      //   targets: 'dist/*',
      // }),
      // js 压缩插件，需要在最后引入
      uglify(),
    ],
  },
  {
    input: 'lib/index.js', // 入口文件
    output: {
      file: 'dist/xr-monitor-sdk.cjs.js', // 输出文件
      format: 'cjs',
      name: 'XrMonitor', //这将指定在 UMD 模块中使用的全局变量名称。
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        presets: ['@babel/preset-env'],
        exclude: 'node_modules/**', // 不编译 node_modules 中的代码
        plugins: [['transform-remove-console', { exclude: ['error', 'warn'] }]],
      }),
      // js 压缩插件，需要在最后引入
      uglify(),
    ],
  },
  {
    input: 'lib/index.js', // 入口文件
    output: {
      file: 'dist/xr-monitor-sdk.amd.js', // 输出文件
      format: 'amd',
      name: 'XrMonitor', //这将指定在 UMD 模块中使用的全局变量名称。
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        presets: ['@babel/preset-env'],
        exclude: 'node_modules/**', // 不编译 node_modules 中的代码
        plugins: [['transform-remove-console', { exclude: ['error', 'warn'] }]],
      }),
      // js 压缩插件，需要在最后引入
      uglify(),
    ],
  },
];
