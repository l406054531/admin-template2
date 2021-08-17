import request from '@/utils/request'
import { baseURL } from '@/config'

export function findAllListApi(params) {
    return request({
        baseURL,
        url: '/view/findAll',
        method: 'get',
        params
    })
}

export function addListApi(data) {
    return request({
        baseURL,
        url: '/view/add',
        method: 'post',
        data
    })
}

export function deleteListApi(data) {
    return request({
        baseURL,
        url: '/view/delete',
        method: 'post',
        data
    })
}

export function updateListApi(data) {
    return request({
        baseURL,
        url: '/view/update',
        method: 'post',
        data
    })
}