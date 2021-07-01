import { Encrypt, Decrypt } from './Crypto';
const tokenKey = 'token'
const menuKey = 'menu'
const userinfoKey = 'userInfo'

export function setToken(val) {
    return sessionStorage.setItem(tokenKey, Encrypt(val))
}

export function getToken() {
    return Decrypt(sessionStorage.getItem(tokenKey) + "")
}
export function setMenu(val) {
    return sessionStorage.setItem(menuKey, Encrypt(val))
}

export function getMenu() {
    return Decrypt(sessionStorage.getItem(menuKey) + "")
}
export function setUserInfo(val) {
    return sessionStorage.setItem(userinfoKey, Encrypt(val))
}

export function getUserInfo() {
    return Decrypt(sessionStorage.getItem(userinfoKey) + "")
}