import Cookies from 'js-cookie'
import { Encrypt, Decrypt } from '@/utils/Crypto'

const TokenKey = 'rainfall_admin_token'
const MenuKey = 'rainfall_admin_menu'
const roleKey = 'role'
const idUserKey = 'idUser'

/**
 * cookie
 * 保存token
 * @param token token值
 * @param expires 有效期
 * @returns {*}
 */
export function setToken(token, expires) {
    return Cookies.set(TokenKey, token, { expires })
}

/**
 * cookie
 * 获取token
 * @returns {*}
 */
export function getToken() {
    return Cookies.getJSON(TokenKey)
}

/**
 * cookie
 * 移除token
 */
export function removeToken() {
    Cookies.remove(TokenKey)
    sessionStorage.clear();
}
export function setRole(val) {
    return sessionStorage.setItem(roleKey, Encrypt(val))
}

export function getRole() {
    return Decrypt(sessionStorage.getItem(roleKey))
}
export function setIdUser(val) {
    return sessionStorage.setItem(idUserKey, Encrypt(val))
}

export function getIdUser() {
    return Decrypt(sessionStorage.getItem(idUserKey))
}
/**
 * localStorage
 * 保存menu
 * @param menu 菜单列表
 * @param expires 过期时间戳 单位毫秒级
 * @returns {*}
 */
export function setMenus(menu, expires) {
    // debugger
    // expires = Math.round(new Date() / 1000) + 100
    const value = {
            menu,
            expires
        }
        // localStorage.setItem(MenuKey, Encrypt(JSON.stringify(value)))
    sessionStorage.setItem(MenuKey, Encrypt(JSON.stringify(value)))
}

/**
 * localStorage
 * 获取菜单
 * @returns {*}
 */
export function getMenus() {
    let timestamp = Math.round(new Date() / 1000) // 当前秒级时间戳
        // let value = localStorage.getItem(MenuKey)
    let value = sessionStorage.getItem(MenuKey)
    if (value) {
        value = JSON.parse(Decrypt(value))
        if (value.expires) { // 设置了过期时间
            let isExpires = timestamp > value.expires // 判断当前时间戳大于过期时间戳
            if (isExpires) { // 已过期
                sessionStorage.removeItem(MenuKey)
                    // localStorage.removeItem(MenuKey)
                return null
            } else { // 未过期
                return value.menu
            }
        } else {
            return value.menu
        }
    }
    return null
}

/**
 * localStore
 * 移除菜单
 */
export function removeMenus() {
    sessionStorage.removeItem(MenuKey)
        // localStorage.removeItem(MenuKey)
}