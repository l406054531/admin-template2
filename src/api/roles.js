import request from '@/utils/request'
import { baseURL } from '@/config'

export function findPageListApi(params) {
    return request({
        baseURL,
        url: '/roles/findPageList',
        method: 'get',
        params
    })
}
export function findPermissionApi(params) {
    return request({
        baseURL,
        url: '/roles/findPermission',
        method: 'get',
        params
    })
}

export function addListApi(data) {
    return request({
        baseURL,
        url: '/roles/add',
        method: 'post',
        data
    })
}

export function deleteListApi(data) {
    return request({
        baseURL,
        url: '/roles/delete',
        method: 'post',
        data
    })
}

export function updateListApi(data) {
    return request({
        baseURL,
        url: '/roles/update',
        method: 'post',
        data
    })
}