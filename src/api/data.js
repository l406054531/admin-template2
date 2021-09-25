
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
