/*
 * @Author: your name
 * @Date: 2021-02-02 11:36:57
 * @LastEditTime: 2021-04-07 13:15:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-cli4.x-project-template\vue.config.js
 */
'use strict'
const path = require('path')
const defaultConfigs = require('./src/config.js')
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const name = defaultConfigs.title // page title
const port = process.env.port || 8081 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  // 部署应用的基本url  可用 process.env.NODE_ENV 环境变量控制
  publicPath: '',

  // 指定生产环境目录
  outputDir: 'dist',

  // 指定生成静态资源的生成目录
  assetsDir: 'static',

  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效
  lintOnSave: false, // process.env.NODE_ENV === 'development',

  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  /**
   * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
   * 打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
   * map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
   * 有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
   * */
  productionSourceMap: false,

  // 开发服务配置
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      '/api': {
        target: 'http://192.168.1.25:3004',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },

    }
  },

  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        '~': resolve('src/styles')
      }
    }
  },

  chainWebpack (config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    config.module
      .rule('js')
      .test(/\.js$/)
      .use('babel-loader')
      .loader('babel-loader')
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/styles/variables.scss'),
        path.resolve(__dirname, './src/styles/mixins.scss')
      ]
    }
  }
}