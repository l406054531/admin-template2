<!--
 * @Author: l406054531 406054531@qq.com
 * @Date: 2021-12-10 08:37:14
 * @LastEditors: l406054531 406054531@qq.com
 * @LastEditTime: 2022-07-24 21:04:57
 * @FilePath: \admin-template2\src\views\testView\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="home">
    <!-- <Toolbar style="border-bottom: 1px solid #ccc"
             :editor="editor"
             :defaultConfig="toolbarConfig"
             :mode="mode" />
    <Editor style="height: 500px; overflow-y: hidden;"
            v-model="html"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated" /> -->
    组件使用说名：
    <!--pre code为使用必须标签 -->
    <pre><code class="language-javascript">const a = 100;
      function fn(x) { return x + 10 };</code></pre>
  </div>
</template>

<script>

// import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import Prism from "prismjs"
import 'prismjs/themes/prism.css'
export default {
  // components: { Editor, Toolbar },
  data () {
    return {
      // 这样使用可以保留标签
      html: `<main-content tent :title="$route.meta.title" @titlebar-back="$router.back()" :titleback="true" :loading="loading"></main-content>`,
      editor: null,
      toolbarConfig: {},
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default', // or 'simple'
    }
  },
  watch: {
    html () {
      // Prism.highlightAll()
    }
  },
  mounted () {
    Prism.highlightAll()
    // hljs.initHighlightingOnLoad()
    // console.log(hljs.initHighlightingOnLoad);
  },
  beforeDestroy () {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },

  methods: {
    onCreated (editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
  }

}
</script>