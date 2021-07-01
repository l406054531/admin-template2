
/*
 * @Author: lct
 * @Date: 2021-02-02 15:09:49
 * @LastEditTime: 2021-04-07 15:12:22
 * @LastEditors: Please set LastEditors
 * @Description: 数据接口
 * @FilePath: \vue-cli4.x-project-template\src\api\data.js
 */

import request from '@/utils/request'
import { baseURL } from '@/config'
/**
 * 获取数据
 * @param {*} params 参数
 */
export function getData (params) {
  return request({
    baseURL: baseURL,
    url: '/api/data',
    method: 'post',
    data: params
  })
}
