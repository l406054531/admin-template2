import request from '@/utils/request'
import { baseURL } from '@/config'

export function addMandateListApi (data) {
  return request({
    baseURL,
    url: '/mandate/add',
    method: 'post',
    data
  })
}

export function deleteMandateListApi (data) {
  return request({
    baseURL,
    url: '/mandate/delete',
    method: 'post',
    data
  })
}