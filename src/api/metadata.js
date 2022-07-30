
import request from '@/utils/request'
import { baseURL } from '@/config'
/**根据类别去查询相应的元素 */
export function findMetadataElements (typeField) {
  return request({
    baseURL,
    url: '/metadata-element/findElements',
    method: 'get',
    params: {
      typeField
    }
  })
}

