import request from '@/utils/request'
import { loginURL, baseURL } from '@/config'

export function login(data) {
    return request({
        baseURL: loginURL,
        url: '/login',
        method: 'post',
        data
    })
}

export function findPageListApi(params) {
    return request({
        baseURL,
        url: '/user/findPageList',
        method: 'get',
        params
    })
}
export function deleteListApi(params) {
    return request({
        baseURL,
        url: '/user/delete',
        method: 'delete',
        params
    })
}

export function updateListApi(data) {
    return request({
        baseURL,
        url: '/user/update',
        method: 'post',
        data
    })
}

export function addListApi(data) {
    return request({
        baseURL,
        url: '/user/register',
        method: 'post',
        data
    })
}