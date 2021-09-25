import request from '@/utils/request'
import { loginURL, baseURL } from '@/config'

export function login (data) {
  return request({
    baseURL: loginURL,
    url: '/login',
    method: 'post',
    data
  })
}

export function findPageListApi (params) {
  return request({
    baseURL,
    url: '/user/findPageList',
    method: 'get',
    params
  })
}
export function deleteListApi (params) {
  return request({
    baseURL,
    url: '/user/delete',
    method: 'delete',
    params
  })
}

export function updateListApi (data) {
  return request({
    baseURL,
    url: '/user/update',
    method: 'put',
    data
  })
}

export function updatePassword (data) {
  return request({
    baseURL,
    url: '/user/updatePassword',
    method: 'put',
    data
  })
}
export function resetPassword (data) {
  return request({
    baseURL,
    url: '/user/resetPassword',
    method: 'put',
    data
  })
}

export function addListApi (data) {
  return request({
    baseURL,
    url: '/user/add',
    method: 'post',
    data
  })
}

