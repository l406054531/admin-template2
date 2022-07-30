import request from '@/utils/request'
import { baseURL } from '@/config'
export function uploadUserImg (data) {
  return request({
    baseURL,
    url: '/cos/uploadUserImg',
    method: 'post',
    formatType: 'file',
    data
  })
}
export function updateUserImg (data) {
  return request({
    baseURL,
    url: '/cos/updateUserImg',
    method: 'put',
    formatType: 'file',
    data
  })
}
export function uploadArticleCacheImg (data) {
  return request({
    baseURL,
    url: '/cos/uploadArticleCacheImg',
    method: 'post',
    formatType: 'file',
    data
  })
}
