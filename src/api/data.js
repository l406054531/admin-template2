
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

export function getAllDataApi (url) {
  return request({
    baseURL,
    method: 'get',
    url: `${url}/findAll`,
  })
}