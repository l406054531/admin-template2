import request from '@/utils/request'
import { baseURL } from '@/config'

export function findPageListApi(params) {
    return request({
        baseURL,
        url: '/role/findPageList',
        method: 'get',
        params
    })
}
export function findAllList(params) {
    return request({
        baseURL,
        url: '/role/findAll',
        method: 'get',
        params
    })
}

export function addListApi(data) {
    return request({
        baseURL,
        url: '/role/add',
        method: 'post',
        data
    })
}

export function deleteListApi(params) {
    return request({
        baseURL,
        url: '/role/delete',
        method: 'delete',
        params
    })
}

export function updateListApi(data) {
    return request({
        baseURL,
        url: '/role/update',
        method: 'put',
        data
    })
}