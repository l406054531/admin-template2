/**
 *  @Author: lx
 *  @Date: 2021-04-20
 */
import { file2Xce } from "./Export2Excel"
import { Message } from 'element-ui'
export function importExcel(files, Callback) {
    const types = files.name.split('.')[1]
    const fileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'].some(item => item === types)
    if (!fileType) {
        Message({
            type: 'error',
            message: '文件格式错误!',
            duration: 2 * 1000
        })
        return
    }

    file2Xce(files).then(tabJson => {
        if (tabJson && tabJson.length > 0) {
            Callback(tabJson)
        }
    })
}