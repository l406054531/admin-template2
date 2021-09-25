import request from '@/utils/request'
import { baseURL } from '@/config'
import { Message, MessageBox } from 'element-ui'
function deleteListApi (params, url) {
  return request({
    baseURL,
    url: `${url}/batchDelete`,
    method: 'delete',
    params
  })
}
export function batchDelete (params, url) {
  return new Promise((resolve, reject) => {
    MessageBox.confirm("此操作将把选中的数据删除, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        deleteListApi(params, url).then(response => {
          if (response.statusCode === 200) {
            Message({
              type: "success",
              message: "删除成功",
            });

          } else {
            Message({
              type: "error",
              message: response.message,
            });
          }
          resolve()
        })
      }).catch()
  })
}