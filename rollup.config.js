import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import deletePlugin from 'rollup-plugin-delete';
export default [
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
        exclude: 'node_modules/**', // 不编译 node_modules 中的代码
        plugins: [['transform-remove-console', { exclude: ['error', 'warn'] }]], //删除所有 console.log 语句
      }),
      deletePlugin({
        targets: 'dist/*',
      }),
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
        exclude: 'node_modules/**', // 不编译 node_modules 中的代码
        plugins: [['transform-remove-console', { exclude: ['error', 'warn'] }]],
      }),
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
        exclude: 'node_modules/**', // 不编译 node_modules 中的代码
        plugins: [['transform-remove-console', { exclude: ['error', 'warn'] }]],
      }),
    ],
  },
];
