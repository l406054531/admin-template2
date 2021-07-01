/*
 * @Author: your name
 * @Date: 2021-02-02 11:35:18
 * @LastEditTime: 2021-04-07 10:22:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-cli4.x-project-template\.eslintrc.js
 */
module.exports = {
    root: true,
    env: {
        browser: false,
        node: false
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-unused-vars': 'off'
    }
}