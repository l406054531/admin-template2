import request from '@/utils/request'
import { baseURL } from '@/config'
export function findPageListApi (params) {
  return request({
    baseURL,
    url: '/accessRecord/findPageList',
    method: 'get',
    params
  })
}
export function findAllApi () {
  return request({
    baseURL,
    url: '/accessRecord/findAll',
    method: 'get',
  })
}

export function deleteListApi (params) {
  return request({
    baseURL,
    url: '/accessRecord/delete',
    method: 'delete',
    params
  })
}
