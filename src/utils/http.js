import {
  getPageListApi,
  getAddDataApi,
  getUpdateDataApi,
  getDeleteDataApi,
  getAllDataApi
} from "@/api/data";

import { Message, MessageBox } from 'element-ui'
const createHttp = (url, vm) => {
  const http = class {
    constructor(url, vm) {
      this.url = url
      this.vm = vm
    }
    async getPageList (data, callback) {
      const result = await getPageListApi(this.url, data)
      result && callback(result);
    }
    async getAllData (callback, data = {}) {
      const result = await getAllDataApi(this.url, data)
      result && callback(result);
    }
    async addData (data, callback) {
      const result = await getAddDataApi(this.url, data);
      if (result && result.statusCode === 200) {
        Message({
          type: "success",
          message: "新增成功",
        });
        callback && callback()
      } else {
        Message({
          type: "error",
          message: result.message,
        });
      }
    }
    async updateData (data, callback) {
      const result = await getUpdateDataApi(this.url, data);
      if (result && result.statusCode === 200) {
        Message({
          type: "success",
          message: "修改成功",
        });
        callback && callback()
      } else {
        Message({
          type: "error",
          message: result.message,
        });
      }
    }
    async deleteData (data, idKey, callback) {
      MessageBox.confirm("此操作将把这条数据放进回收站, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let delData = {}
          delData[idKey] = data[idKey]
          const result = await getDeleteDataApi(this.url, delData);
          if (result && result.statusCode === 200) {
            Message({
              type: "success",
              message: "删除成功",
            });
            callback && callback()
          } else {
            Message({
              type: "error",
              message: result.message,
            });
          }
        })
        .catch();
    }

  }
  return new http(url, vm)
}
export const useHttp = createHttp
export default useHttp