/**
 * @author lx 
 * @createTime 21-08-18
 * @description 缓存
 */

// 默认缓存期限为7天
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7 * 1000;

/**
 * 创建本地缓存对象
 * @param {string=} prefixKey - 前缀 key
 * @param {Object} [storage=localStorage] - sessionStorage | localStorage
 */
export const createStorage = ({ prefixKey = '', storage = sessionStorage } = {}) => {
    const Storage = class {
        constructor(prefixKey, storage) {
                this.prefixKey = prefixKey
                this.storage = storage
            }
            /**
             * @param {*} key 
             * @returns 
             * @description 获取前缀+key
             */
        getKey(key) {
                return `${this.prefixKey}${key}`.toUpperCase();
            }
            /**
             * @param {*} key  键
             * @param {*} value 值
             * @param {*} expire 过期时间
             * @description 设置缓存
             */
        set(key, value, expire) {
                const stringData = JSON.stringify({
                    value,
                    expire: expire !== null ? new Date().getTime() + expire : new Date().getTime() + DEFAULT_CACHE_TIME
                })
                this.storage.setItem(this.getKey(key), stringData);
            }
            /**
             * @param {*} key 键
             * @description 获取缓存
             * @returns 
             */
        get(key) {
            const item = this.storage.getItem(this.getKey(key));
            if (item) {
                try {
                    let { value, expire } = JSON.parse(item)
                    if (expire == null || expire >= Date.now()) {
                        return value
                    }
                    this.remove(this.getKey(key))
                } catch (e) {
                    return e
                }
            }
        }

        /**
         * 
         * @param {*} key 键
         * @description 根据键删除缓存
         */
        remove(key) {
            this.storage.removeItem(this.getKey(key));
        }

        /**
         * @description 清空缓存
         */
        clear() {
            this.storage.clear();
        }
    }
    return new Storage(prefixKey, storage)
}

// export const storage = createStorage();

// export default Storage;