import request from '@/utils/request'
import { baseURL } from '@/config'
export function findUploadFileApi (data) {
  return request({
    baseURL,
    method: 'post',
    formatType: 'file',
    url: `/answer-bank/uploadFile`,
    data
  })
}