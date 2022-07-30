<template>
  <div class="article-edit">
    <el-divider content-position="left">{{title}}</el-divider>
    <el-button type="success"
               class="submit"
               @click="handleSubmit"
               size="mini">保存</el-button>
    <basics-form ref="basicsForm"
                 formItemWidth="30%"
                 :rowData="rowData"
                 :rules="rules"
                 :formElement="formElement">
      <el-form-item label="内容"
                    label-width="80px">
        <div class="github-markdown-body">
          <mavon-editor ref=md
                        class="mavonEditor"
                        @imgAdd="handleImgAdd"
                        v-model="mdValue" />
        </div>

      </el-form-item>

    </basics-form>

  </div>
</template>

<script>
import useHttp from "@/utils/http"
import { uploadArticleCacheImg } from '@/api/upload'
import { getImgUrlName, getElementsNameValue } from "@/utils"
import { findMetadataElements } from "@/api/metadata"
const pattern = /https.*?(\.png|\.jpg|\.jpeg)/g;
export default {
  data () {

    return {
      mdValue: '',
      rowData: {},
      rules: {},
      formElement: [
        { label: '标题', prop: 'title', type: 'input' },
        { label: 'url', prop: 'url', type: 'input' },
        { label: '标签', prop: 'labels', type: 'select', typeselects: [], multiple: true },
        { label: '状态', prop: 'status', type: 'select', typeselects: [] },
        { label: '是否置顶', prop: 'isTop', type: 'select', typeselects: [{ label: '是', value: true }, { label: '否', value: false }] },
        { label: '是否加精', prop: 'isEssence', type: 'select', typeselects: [{ label: '是', value: true }, { label: '否', value: false }] },
        { label: '简介', prop: 'intro', type: 'textarea' },
        { label: '', prop: 'idArticle', type: 'id' },
      ],
      idKey: 'idArticle',
      httpUrl: 'article',
      cacheImgs: [],//当前已经上传在缓存文件夹中的照片路径  
      urls: [],// 当前内容中已经在正式文件夹中的图片路径
      imgIndex: null
    }
  },
  computed: {
    title () {
      return this.$route.query.title ? this.$route.query.title : '新增'
    },
    useHttp () {
      return useHttp(this.httpUrl, this)
    }
  },

  mounted () {
    const data = this.$route.query.data
    if (data) {
      this.rowData = data
      this.mdValue = data.content
      this.urls = data.content.match(pattern) // 获取当前文本框内所有图片的路径
    }
    this.handleMetadataElements()
  },

  methods: {
    handleImgAdd (imgIndex, file) {
      let formdata = new FormData();
      formdata.append('file', file);
      uploadArticleCacheImg(formdata).then(response => {
        this.imgIndex = imgIndex
        this.cacheImgs.push(response.data.url)
        this.$refs.md.$img2Url(imgIndex, response.data.url)
      })
    },

    /**
     * @description: 提交
     * @return {*}
     */
    handleSubmit () {
      let currentTextImgSrc = this.mdValue.match(pattern) || [] // 获取当前文本框内所有图片的路径
      this.mdValue = this.mdValue.replace(/blog\/cache/g, 'blog/images')// 把缓存在文本框内图片的路径替换成正式的图片路径 
      this.imgIndex && this.$refs.md.$img2Url(this.imgIndex, this.cacheImgs[this.imgIndex - 1])
      // moveImgs 需要移动的照片  deleteImgs需要删除的照片  就是 修改时把content里原有的图片路径删除时 把该图片的文件名传到后端 让后端删除服务上的照片
      let moveImgs = [], deleteImgs = []
      // 把已经上传在缓存文件夹中的照片路径和当前文本框内所有图片的路径对比  还存在于文本框内的图片存在moveImgs中提交到后端
      this.cacheImgs.map(i => {
        if (currentTextImgSrc.some(j => i == j)) {
          moveImgs.push(getImgUrlName(i))
        }
      })
      let data = JSON.parse(JSON.stringify(this.$refs.basicsForm.handleSubmit()))
      data.content = this.mdValue
      data.moveImgs = moveImgs
      data.labels = data.labels.join(',')
      if (this.title == '新增') {
        this.useHttp.addData(data, () => {
        })
      } else {
        for (let i in this.urls) {
          if (!(currentTextImgSrc.some(j => this.urls[i] == j))) {
            deleteImgs.push(getImgUrlName(this.urls[i]))
          }
        }
        data.deleteImgs = deleteImgs
        this.useHttp.updateData(data)
      }
    },

    /**
     * @description: 获取元数据
     * @return {*}
     */
    async handleMetadataElements () {
      const labels = await findMetadataElements('article-label')
      const status = await findMetadataElements('article-status')
      console.log(status);
      this.formElement.forEach(item => {
        if (item.prop === 'labels') {
          item.typeselects = getElementsNameValue(labels.dataList)
        }
        if (item.prop === 'status') {
          item.typeselects = getElementsNameValue(status.dataList)
        }
      })
      // console.log(labels);
    },
  }


}
</script>
<style lang='scss' scoped>
@import url("../../styles/github-markdown.scss");
.article-edit {
  .submit {
    margin: 0 0 20px 80px;
  }
}
.mavonEditor {
  width: 100%;
  min-height: 800px;
}
::v-deep {
  .shadow img {
    position: relative;
  }
}
</style>