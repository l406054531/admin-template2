import request from '@/utils/request'
import { baseURL } from '@/config'
//元数据

/**新增元数据所有类别 */
export function addMetadataTypeListApi(data) {
    return request({
        baseURL,
        url: '/metadataType/add',
        method: 'post',
        data
    })
}
/**删除元数据类别 */
export function deleteMetadataTypeListApi(data) {
    return request({
        baseURL,
        url: '/metadataType/delete',
        method: 'post',
        data
    })
}
/**查询元数据所有类别 */
export function findAllMetadataTypeList() {
    return request({
        baseURL,
        url: '/metadataType/findAllList',
        method: 'get',
    })
}

/**根据类别去查询相应的元素 */
export function findAllMetadataElementList(params) {
    return request({
        baseURL,
        url: '/metadataElement/findAllList',
        method: 'get',
        params
    })
}

export function findAllList(params, url) {
    return request({
        baseURL,
        url: `${url}/findAllList`,
        method: 'get',
        params
    })
}

export function addListApi(data, url) {
    return request({
        baseURL,
        url: `${url}/add`,
        method: 'post',
        data
    })
}
export function deleteListApi(data, url) {
    return request({
        baseURL,
        url: `${url}/delete`,
        method: 'post',
        data
    })
}