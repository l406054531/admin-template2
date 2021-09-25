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
