<template>
  <div class="import-file">
    <div class="type-select">
      <div class="topic-type">
        <el-button-group>
          <el-button v-for="(item,index) in topicTypeList"
                     :key="index"
                     :type="item.value==topicType?'success':'primary'"
                     @click="handleClickTopicType(item.value)">{{item.label}}</el-button>
        </el-button-group>
      </div>
      <div class="file-type">
        <el-button-group>
          <el-button v-for="(item,index) in fileTypeList"
                     :disabled="topicType=='' "
                     :key="index"
                     :type="item.type"
                     @click="handleClickFileType(item.label)">{{item.label}}</el-button>
        </el-button-group>
      </div>
      <el-upload class="upload-demo"
                 style="display:none"
                 action=""
                 accept=".docx,.pdf"
                 :auto-upload="false"
                 :on-change="handleUpload">
        <el-button size="small"
                   ref="uploadBtn"
                   type="primary">点击上传</el-button>
      </el-upload>

    </div>
    <div class="docx-content">
      <div class="docx-content--left"
           v-html="docxContent"></div>
      <div class="docx-content--right">
        <template v-for="(item,index) in questions">
          <div class="topic"
               :key="index">
            <div class="topic-content">
              {{item.topic}}
            </div>
            <el-radio-group v-model="item.answer">
              <el-radio :label="citem"
                        v-for="(citem,cindex) in item.options"
                        :key="cindex">{{citem}}</el-radio>
            </el-radio-group>
          </div>

        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { findUploadFileApi } from "@/api/AnswerBank"
export default {
  data () {
    return {
      radio: '哈哈',
      docxContent: '',
      topicTypeList: [
        {
          label: '单选题',
          value: '1',
          type: 'primary'
        },
        {
          label: '多选题',
          value: '2',
          type: 'success'
        },
        {
          label: '填空题',
          value: '3',
          type: 'warning'
        },
      ],
      topicType: '',
      fileTypeList: [
        {
          label: 'docx',
          type: 'primary'
        },
        {
          label: 'pdf',
          type: 'success'
        }
      ],
      questions: [

      ]
    }
  },
  computed: {

  },
  mounted () { },

  methods: {
    handleClickTopicType (value) {
      this.topicType = value
      console.log(this.questions);
    },
    handleClickFileType () {
      this.$refs['uploadBtn']['$el'].click()
    },
    handleUpload ({ raw }) {
      // const file = this.$refs['uploadInp'].files[0]
      let form = new FormData();
      const fileType = raw.name.substring(raw.name.indexOf('.') + 1)
      form.append("file", raw)
      form.append("type", this.topicType)
      form.append("fileType", fileType)
      // // console.log(file);
      findUploadFileApi(form).then(response => {
        this.docxContent = response.data.html
        this.questions=response.data.questions
      })
    }
  }


}
</script>
<style lang='scss' scoped>
.import-file {
  .type-select {
    display: flex;
    justify-content: center;
    .topic-type {
    }
    .file-type {
      margin-left: 100px;
    }
  }
  .docx-content{
    display: flex;
      justify-content: center;
    &--right{
      .topic{
        padding: 10px 0;
      }
      .el-radio{
        display: block;
        padding: 5px;
      }
    }
  }
}
</style>