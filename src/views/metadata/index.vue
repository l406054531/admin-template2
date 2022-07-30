<template>
  <div>
    <div class="manage">
      <el-button type="success"
                 size="small"
                 @click="handleManageClick">{{manageTitle}}</el-button>
    </div>
    <div class="metadata">
      <div class="metadata-type">
        <el-divider content-position="left">类型</el-divider>
        <div class="metadata-type--item"
             v-for="(item,index) in metadataTypes"
             :key="index">
          <el-row class="metadata-type--item">
            <el-link @click="handleActiveLinkClick(item)"
                     :type="activeType==item.typeField?'warning':'primary'"
                     :underline="false">
              {{item.typeName}}
            </el-link>
            <el-divider></el-divider>
          </el-row>
        </div>

      </div>
      <Type class="type"
            v-if="manageTitle=='类型'"
            :tableData="typeData"
            @handleTypeSubmit="handleAllMetadataTypes" />
      <Element v-else
               :tableData="elementTableData"
               :typeField="activeType"
               @handleElementSubmit="handleMetadataElements" />
    </div>
  </div>
</template>

<script>
import useHttp from "@/utils/http"
import { findMetadataElements } from "@/api/metadata"
export default {
  components: {
    Type: () => import('./type.vue'),
    Element: () => import('./element.vue')
  },
  data () {
    return {
      metadataTypes: [],
      activeType: '',
      manageTitle: '元素',
      typeTableData: [],
      elementTableData: []
    }
  },
  computed: {
    useTypeHttp () {
      return useHttp('metadata-type', this)
    },
    useElementHttp () {
      return useHttp('metadata-element', this)
    },
  },
  mounted () {
    this.handleAllMetadataTypes({}, (result) => {
      if (result.length > 0) {
        this.activeType = result[0].typeField
        this.handleMetadataElements()
      }
    })
  },

  methods: {
    /**
     * @description: 获取元数据的类型
     * @return {*}
     */
    handleAllMetadataTypes (data = {}, callback) {
      this.useTypeHttp.getAllData((result) => {
        this.metadataTypes = result.dataList
        this.typeData = result.dataList
        this.loading = false
        callback && callback(result.dataList)
      }, data)
    },

    /**
     * @description: 根据元数据的类型获取元素
     * @return {*}
     */
    handleMetadataElements () {
      findMetadataElements(this.activeType).then(response => {
        this.elementTableData = response.dataList
      })
    },
    /**
     * @description: 点击类型时获取对应类型的元素
     * @param {*} type 类型
     * @return {*}
     */
    handleActiveLinkClick (type) {
      this.activeType = type.typeField
      this.handleMetadataElements()
    },
    handleManageClick () {
      this.manageTitle = this.manageTitle == '元素' ? '类型' : '元素'
    },
  }
}
</script>
<style lang='scss' scoped>
.manage {
  margin-left: 20px;
  margin-bottom: 10px;
}
.metadata {
  display: flex;
  justify-content: space-between;
  .metadata-type {
    width: 13%;
    overflow: auto;
    border: 1px solid #dfe6ec;
    border-radius: 4px;
    margin: 0px 20px 0 20px;
    .el-row {
      height: 60px;
      text-align: center;
    }
    .divider {
      background-color: #e6a23c;
    }
  }
  .element,
  .type {
    width: 84%;
  }
}
</style>