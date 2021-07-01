import request from '@/utils/request'
import { loginURL, baseURL } from '@/config'

export function login(data) {
    return request({
        baseURL: loginURL,
        url: '/user/login',
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
export function deleteListApi(data) {
    return request({
        baseURL,
        url: '/user/delete',
        method: 'post',
        data
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