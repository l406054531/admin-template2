import request from '@/utils/request'
import { baseURL } from '@/config'

export function findPageListApi (params) {
  return request({
    baseURL,
    url: '/metadata/findPageList',
    method: 'get',
    params
  })
}

export function addListApi (data) {
  return request({
    baseURL,
    url: '/metadata/add',
    method: 'post',
    data
  })
}

export function deleteListApi (data) {
  return request({
    baseURL,
    url: '/metadata/delete',
    method: 'post',
    data
  })
}

export function updateListApi (data) {
  return request({
    baseURL,
    url: '/metadata/update',
    method: 'post',
    data
  })
}