import request from '@/utils/request'
import { baseURL } from '@/config'

export function findAllListApi(params) {
    return request({
        baseURL,
        url: '/pages/findAllList',
        method: 'get',
        params
    })
}

export function addListApi(data) {
    return request({
        baseURL,
        url: '/pages/add',
        method: 'post',
        data
    })
}

export function deleteListApi(data) {
    return request({
        baseURL,
        url: '/pages/delete',
        method: 'post',
        data
    })
}

export function updateListApi(data) {
    return request({
        baseURL,
        url: '/pages/update',
        method: 'post',
        data
    })
}