/*
 * @Author: l406054531 406054531@qq.com
 * @Date: 2021-09-25 17:04:18
 * @LastEditors: l406054531 406054531@qq.com
 * @LastEditTime: 2022-06-22 20:45:30
 * @FilePath: \admin-template2\src\api\data.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import request from '@/utils/request'
import { baseURL } from '@/config'
export function getPageListApi (url, params) {
  return request({
    baseURL,
    method: 'get',
    url: `${url}/findPageList`,
    params
  })
}

export function getAddDataApi (url, data) {
  return request({
    baseURL,
    method: 'post',
    url: `${url}/add`,
    data
  })
}
export function getUpdateDataApi (url, data) {
  return request({
    baseURL,
    method: 'put',
    url: `${url}/update`,
    data
  })
}
export function getDeleteDataApi (url, params) {
  return request({
    baseURL,
    method: 'delete',
    url: `${url}/delete`,
    params
  })
}

export function getAllDataApi (url,params) {
  return request({
    baseURL,
    method: 'get',
    url: `${url}/findAll`,
    params
  })
}